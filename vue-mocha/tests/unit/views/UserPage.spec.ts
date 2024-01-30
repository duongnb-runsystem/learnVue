import { EStatusCode } from "@/core/constants/appConstants";
import { UserDto } from "@/core/dto/userDto";
import ApiService from "@/core/services/api.service";
import sinon, { SinonStub } from "sinon";
import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { ToastUtils } from "@/core/utils/toastUtils";
import { TestUtils } from "../../utils/testUitls";
import { expect } from "chai";
import { flushPromises, mount } from "@vue/test-utils";
import DataTable from "primevue/datatable";
import UserPage from "@/views/UserPage.vue";
import UserForm from "@/components/UserForm.vue";
import DeleteUserModal from "@/components/DeleteUserModal.vue";
interface IApiCodesStub {
  isCodesError?: boolean;
  data?: UserDto[];
}

const DEFAULT_USERS: UserDto[] = new Array(10).fill(
  new UserDto({
    id: "",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
    phone: "1234567890",
    code: "1",
  }),
);

const sandbox = sinon.createSandbox();

describe("UserPage", () => {
  let apiGetStub: SinonStub;
  let apiPostStub: SinonStub;
  let apiPutStub: SinonStub;
  let apiDeleteStub: SinonStub;
  const messageUtilsStub: sinon.SinonStubbedInstance<typeof ToastUtils> = TestUtils.getToastMessageStub();
  /**
   * Create all api calls stubs for UserForm component
   * @param props Dynamic props for stub
   * @returns stub
   */
  const createStub = (props?: IApiCodesStub) => {
    apiGetStub = sandbox.stub(ApiService, "GET");

    const notFoundRequest = {
      name: "Error",
      message: "Request failed with status code 404",
      response: { data: {}, status: EStatusCode.NOT_FOUND, statusText: "Not Found", headers: {}, config: {} },
      isAxiosError: true,
      config: { headers: {} as AxiosRequestHeaders },
    };

    const response: AxiosResponse<unknown> = {
      data: props?.data ?? DEFAULT_USERS,
      status: EStatusCode.OK,
      statusText: "",
      headers: {},
      config: { headers: {} as AxiosRequestHeaders },
    };

    const rejected = Promise.reject<AxiosResponse<unknown>>(notFoundRequest).then();
    const resolved = Promise.resolve(response).then();
    apiGetStub.withArgs("/users");

    if (props?.isCodesError) apiGetStub.callsFake(() => rejected);
    else apiGetStub.returns(resolved);

    return apiGetStub;
  };

  const createPostStub = (props?: UserDto) => {
    apiPostStub = sandbox.stub(ApiService, "POST");
    // Mock the API response
    apiPostStub.returns(Promise.resolve({ data: props }));
    return apiPostStub;
  };
  const createPutStub = () => {
    apiPutStub = sandbox.stub(ApiService, "PUT");
    // Mock the API response
    apiPutStub.returns(Promise.resolve({ data: {} }));
    return apiPutStub;
  };
  const createDeleteStub = () => {
    apiDeleteStub = sandbox.stub(ApiService, "DELETE");
    // Mock the API response
    apiDeleteStub.returns(Promise.resolve({ data: {} }));
    return apiDeleteStub;
  };

  afterEach(() => {
    // If want to use stubs for all tests, use this
  });

  afterEach(() => {
    sandbox.restore();
    // Reset stubs toast history
    messageUtilsStub.info.resetHistory();
    messageUtilsStub.success.resetHistory();
    messageUtilsStub.removeAll.resetHistory();
  });
  it("No.1 [Normal]: Initial display > API GET /users set data to dataTable have selected mode = single, first item is selected and pass data to user form", async () => {
    //create api stub
    const stub = createStub();
    // mount component
    const wrapper = mount(UserPage);
    await flushPromises();

    try {
      // wait for next tick => load layout done
      await wrapper.vm.$nextTick();
      // check api call /users
      const apiGetUsers = stub.withArgs("/users");
      const apiGetUsesRes = await apiGetUsers.getCall(0).returnValue;
      const expectedData = apiGetUsesRes.data;
      // check api call count
      expect(stub.withArgs("/users").callCount).to.equal(1);

      /// get component datatable,expected data list
      const dataTable = wrapper.find(".c-l-user").findComponent(DataTable);
      // check selection mode
      expect(dataTable.props("selectionMode")).to.equal("single");

      // check data datatable equal expectedData
      expect(dataTable.props("value")).to.deep.equal(expectedData);
      // check data userform equal expected first record
      // get component userform
      const userForm = wrapper.find(".c-function").findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(expectedData[0]);
    } finally {
      wrapper.unmount();
    }
  });
  it("No.2 [Normal]: Initial view mode > Click button Add,disable btn Add,Edit,Delete , show btn Cancel/Submit,show loading on dataTable ", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      const btnEdit = btns.find((b) => b.text() === "Edit");
      const btnDelete = btns.find((b) => b.text() === "Delete");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }
      await wrapper.vm.$nextTick();

      // Check disable 3 buton Add,Edit,Delete
      expect(btnAdd?.element.disabled).to.equal(true);
      expect(btnEdit?.element.disabled).to.equal(true);
      expect(btnDelete?.element.disabled).to.equal(true);

      // Get button Submit and Cancel, check show
      const btnsAfterClick = divFunction.findAll("button");
      const btnCancel = btnsAfterClick.find((b) => b.text() === "Cancel");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      expect(btnCancel?.isVisible()).to.equal(true);
      expect(btnSubmit?.isVisible()).to.equal(true);

      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(new UserDto({}));

      // Check loading datatable
      const loading = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loading.isVisible()).to.equal(true);
    } finally {
      wrapper.unmount();
    }
  });
  it("No.3 [Normal]: Initial display > Click Add > User input data null, Validate failed name is required", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "",
      email: "john.doe@example.com",
    });
    const errorMessage = { name: "Name is required", email: "" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);

      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.4 [Normal]: Initial display > Click Add > User input data null, Validate failed email is required", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "John Doe",
      email: "",
    });
    const errorMessage = { name: "", email: "Email is required" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      await wrapper.vm.$nextTick();
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.5 [Normal]: Initial display > Click Add > User input data null, Validate failed email is not valid", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "John Doe",
      email: "John.doe",
    });
    const errorMessage = { name: "", email: "Email address is not valid" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      await wrapper.vm.$nextTick();
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.6 [Normal]: Initial display > Click Edit > User input data null, Validate failed name is required", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "",
      email: "john.doe@example.com",
    });
    const errorMessage = { name: "Name is required", email: "" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Edit");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.7 [Normal]: Initial display > Click Edit > User input data null, Validate failed email is required", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "John Doe",
      email: "",
    });
    const errorMessage = { name: "", email: "Email is required" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Edit");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);

      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      await wrapper.vm.$nextTick();
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.8 [Normal]: Initial display > Click Edit > User input data null, Validate failed email is not valid", async () => {
    const wrapper = mount(UserPage);
    await flushPromises();
    const dataInputUser = new UserDto({
      name: "John Doe",
      email: "John.doe",
    });
    const errorMessage = { name: "", email: "Email address is not valid" };
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Edit");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);

      // input data to user form
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      // Check userForm data new UserDto
      const userForm = divFunction.findComponent(UserForm);
      expect(userForm.props("user")).to.deep.equal(dataInputUser);
      // Get btn Submit and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      await wrapper.vm.$nextTick();
      // Check error message
      expect(wrapper.vm.errors).to.deep.equal(errorMessage);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.9 [Normal]: Initial display > Click Add > Validate Passed call api /users", async () => {
    const dataInputUser = new UserDto({
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      phone: "123-456-789",
      code: "1",
    });
    const stubGet = createStub();
    const stubPost = createPostStub(dataInputUser);
    const wrapper = mount(UserPage);
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }

      await wrapper.vm.$nextTick();
      //show loading
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);

      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      const userForm = divFunction.findComponent(UserForm);
      // Set data userForm
      expect(userForm.props("user")).to.deep.equal(dataInputUser);

      // Get button Submit and Cancel, check show
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      // check api call count
      expect(stubPost.withArgs("/users").callCount).to.equal(1);
      expect(stubGet.withArgs("/users").callCount).to.equal(2);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.10 [Normal]: Initial display >  Click Edit > Validate Passed call api /users", async () => {
    const dataInputUser = new UserDto({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      phone: "123-456-789",
      code: "1",
    });
    const stubGet = createStub();
    const stubPut = createPutStub();
    const wrapper = mount(UserPage);
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Edit");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      wrapper.vm.selectedUser = dataInputUser;
      await wrapper.vm.$nextTick();
      const userForm = divFunction.findComponent(UserForm);
      // Set data userForm
      expect(userForm.props("user")).to.deep.equal(dataInputUser);

      // Get button Submit and Cancel, check show
      const btnsAfterClick = divFunction.findAll("button");
      const btnSubmit = btnsAfterClick.find((b) => b.text() === "Submit");
      if (btnSubmit?.exists()) {
        await btnSubmit.trigger("click");
      }
      // check api call count
      expect(stubPut.withArgs("/users/" + dataInputUser.id).callCount).to.equal(1);
      expect(stubGet.withArgs("/users").callCount).to.equal(2);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.11 [Normal] : Initial display > Click add > Show load > click Cancel > hiden load", async () => {
    createStub();
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Add");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      await wrapper.vm.$nextTick();
      // Get button Cancel and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnCancel = btnsAfterClick.find((b) => b.text() === "Cancel");
      if (btnCancel?.exists()) {
        await btnCancel.trigger("click");
      }
      await wrapper.vm.$nextTick();
      const loadingHiden = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingHiden?.exists()).to.equal(false);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.12 [Normal] : Initial display > Click edit > Show load > click Cancel > hiden load", async () => {
    createStub();
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnAdd = btns.find((b) => b.text() === "Edit");
      if (btnAdd?.exists()) {
        await btnAdd.trigger("click");
      }
      const loadingShow = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingShow.isVisible()).to.equal(true);
      await wrapper.vm.$nextTick();
      // Get button Cancel and call click
      const btnsAfterClick = divFunction.findAll("button");
      const btnCancel = btnsAfterClick.find((b) => b.text() === "Cancel");
      if (btnCancel?.exists()) {
        await btnCancel.trigger("click");
      }
      await wrapper.vm.$nextTick();
      const loadingHiden = wrapper.find(".c-l-user").find(".loading-mask");
      expect(loadingHiden?.exists()).to.equal(false);
    } finally {
      wrapper.unmount();
    }
  });
  it("No.13 [Normal] : Initial display > Click Delete > Show loading> Show dialog > click Delete > hiden load", async () => {
    const stubGet = createStub();
    const stubDelete = createDeleteStub();
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnDelete = btns.find((b) => b.text() === "Delete");
      if (btnDelete?.exists()) {
        await btnDelete.trigger("click");
      }
      await wrapper.vm.$nextTick();
      //show dialog
      expect(wrapper.vm.showDeleteModal).to.equal(true);
      // Get button Delete and call click
      const modalDelete = wrapper.findComponent(DeleteUserModal);
      modalDelete.vm.$emit("delete");
      await wrapper.vm.$nextTick();
      // call api delete
      expect(stubDelete.withArgs("/users/" + wrapper.vm.selectedUser.id).callCount).to.equal(1);
      // hide dialog
      expect(wrapper.vm.showDeleteModal).to.equal(false);
      // call api get users
      expect(stubGet.withArgs("/users").callCount).to.equal(2);
    } finally {
      wrapper.unmount();
    }
  });
  it("No.14 [Normal] : Initial display > Click Delete > Show loading> Show dialog > click Cancel > hiden load", async () => {
    createStub();
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      const divFunction = wrapper.find(".c-function");
      // Get button Add and call click
      const btns = divFunction.findAll("button");
      const btnDelete = btns.find((b) => b.text() === "Delete");
      if (btnDelete?.exists()) {
        await btnDelete.trigger("click");
      }
      await wrapper.vm.$nextTick();
      //show dialog
      expect(wrapper.vm.showDeleteModal).to.equal(true);
      // Get button Delete and call click
      const modalDelete = wrapper.findComponent(DeleteUserModal);
      modalDelete.vm.$emit("close");
      await wrapper.vm.$nextTick();
      // hiden dialog
      expect(wrapper.vm.showDeleteModal).to.equal(false);
    } finally {
      wrapper.unmount();
    }
  });
});
