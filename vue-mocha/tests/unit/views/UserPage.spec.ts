/* eslint-disable prettier/prettier */
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

// const ADD_NEW_USER: UserDto = new UserDto({
//   id: "",
//   name: "John Doe",
//   email: "john.doe@example.com",
//   address: "123 Main St",
//   phone: "1234567890",
//   code: "1",
// });
const sandbox = sinon.createSandbox();

describe("UserPage", () => {
  let apiGetStub: SinonStub;
  // let apiPostStub: SinonStub;
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

//  const createPostStub = (props?:UserDto) => {
//   apiPostStub = sandbox.stub(ApiService, "POST");
//   // Mock the API response
//   apiPostStub.returns(Promise.resolve({ data: props }));
//   return apiPostStub;
//  };


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
  it("No.2 [Normal]: Initial view mode > Click button Add, userForm edit mode, show btn Cancel/Submit ", async () => {
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
    } finally {
      wrapper.unmount();
    }
  });

  it("No.3 [Normal]: Initial view mode > Validate Passed call api /users", async () => {
    // const stub = createPostStub();
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
      const userForm = divFunction.findComponent(UserForm);
      const dataInputUser = new UserDto(
        { 
          name: "John Doe",
          email: "john.doe@example.com",
          address: "123 Main St",
          phone: "1234567890",
          code: "1",
        });

      // Set data userForm
      await wrapper.setValue({ selectedUser: dataInputUser });
      await wrapper.vm.$nextTick();
        console.log(userForm.props("user"));
      // expect(userForm.props("user")).to.deep.equal(dataInputUser);
    } finally {
      wrapper.unmount();
    }
  });
});
