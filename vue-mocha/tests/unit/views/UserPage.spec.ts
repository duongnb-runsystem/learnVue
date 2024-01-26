import { EStatusCode } from "@/core/constants/appConstants";
import { CodeDto } from "@/core/dto/codeDto";
import { UserDto } from "@/core/dto/userDto";
import ApiService from "@/core/services/api.service";
import sinon, { SinonStub } from "sinon";
import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { ToastUtils } from "@/core/utils/toastUtils";
import { TestUtils } from "../../utils/testUitls";
import { expect } from "chai";
import { flushPromises, mount } from "@vue/test-utils";
import UserPage from "@/views/UserPage.vue";
interface IApiCodesStub {
  isCodesError?: boolean;
  data?: CodeDto[];
}

const DEFAULT_USERS: UserDto[] = new Array(10).fill(
  new UserDto({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
    phone: "1234567890",
    code: "1",
  }),
);
const sandbox = sinon.createSandbox();

describe("UserForm.vue", () => {
  let apiGetStub: SinonStub;
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
  it("No.1 [Normal]: Initial view mode > API GET /users executed with status === 200", async () => {
    const stub = createStub();
    const wrapper = mount(UserPage);
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      const apiGetUsers = stub.withArgs("/users");
      expect(stub.withArgs("/users").callCount).to.equal(1);
      const apiGetUsesRes = await apiGetUsers.getCall(0).returnValue;
      expect(apiGetUsesRes.status).to.equal(EStatusCode.OK);
    } finally {
      wrapper.unmount();
    }
  });
  it("No.2 [Normal]: Initial view mode > API GET /codes executed with status === 404 and show toast error", async () => {
    const stub = createStub({ isCodesError: true });
    const wrapper = mount(UserPage);
    await flushPromises();
    try {
      await wrapper.vm.$nextTick();
      expect(messageUtilsStub.error.withArgs("Request failed with status code 404").callCount).to.equal(1);

      try {
        await stub.withArgs("/users").getCall(0).returnValue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        expect(e.response.status).to.eq(EStatusCode.NOT_FOUND);
      }
    } finally {
      wrapper.unmount();
    }
  });
});
