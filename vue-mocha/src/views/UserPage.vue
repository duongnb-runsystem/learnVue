<template>
  <div class="c-content">
    <div class="c-l-user">
      <div v-if="isLoading" class="loading-mask">Loading...</div>
      <ul class="l-users">
        <li class="header">
          <span>Selected</span>
          <span>No</span>
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
        </li>
        <div class="content">
          <li v-for="(item, index) in users" :id="item.id" :key="index" @click="selectUser(item)">
            <input v-model="selectedUser" type="radio" :value="item" />
            <span>{{ item.id }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.email }}</span>
            <span>{{ item.phone }}</span>
          </li>
        </div>
      </ul>
    </div>
    <hr />
    <div class="c-function">
      <div class="c-btn-ced">
        <button :disabled="showConfirmBtn" @click="btnAddClick">Add</button>
        <button :disabled="showConfirmBtn" @click="btnEditClick">Edit</button>
        <button :disabled="showConfirmBtn" @click="btnDelClick">Delete</button>
      </div>
      <div class="c-form-user">
        <UserForm v-model:user="selectedUser" :mode="modeForm" :errors="errors" />
      </div>
      <div v-if="showConfirmBtn" class="c-btn-ced">
        <button @click="btnCancelClick">Cancel</button>
        <button @click="btnSubmitClick">Submit</button>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <DeleteUserModal
      :show="showDeleteModal"
      :user="selectedUser"
      @close="showDeleteModal = false"
      @delete="handleDeleteUser"
    ></DeleteUserModal>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/api.service";
import UserForm from "@/components/UserForm.vue";
import { UserDto } from "@/core/dto/userDto";
import { ToastUtils } from "@/core/utils/toastUtils";
import DeleteUserModal from "@/components/DeleteUserModal.vue";
export default defineComponent({
  name: "UserPage",
  components: {
    UserForm,
    DeleteUserModal,
  },
  setup() {
    const users = ref(new Array<UserDto>());
    const showConfirmBtn = ref(false);
    const modeForm = ref<"edit" | "view" | undefined>("view");
    const selectedUser = ref(new UserDto());
    const errors = ref({
      name: "",
      email: "",
    });
    const showDeleteModal = ref(false);
    const isLoading = ref(false);
    const isAddUser = ref(false);

    const selectUser = (d: UserDto) => {
      selectedUser.value = d;
    };
    const getUsers = async () => {
      await ApiService.GET("/users")
        .then((res) => {
          if (res.data.length > 0) {
            users.value = res.data;
            selectedUser.value = users.value[0];
          } else {
            users.value = [];
          }
        })
        .catch((err) => {
          ToastUtils.error(err?.message);
        });
    };

    const handleAddUser = async () => {
      await ApiService.POST("/users", selectedUser.value)
        .then(() => {
          ToastUtils.success("Add success");
          getUsers();
        })
        .catch((err) => {
          ToastUtils.error(err?.message);
        });
    };

    const handleEditUser = async () => {
      const id = selectedUser.value.id;
      await ApiService.PUT("/users/" + id, selectedUser.value)
        .then(() => {
          ToastUtils.success("Edit success");
          getUsers();
        })
        .catch((err) => {
          ToastUtils.error(err?.message);
        });
    };
    const handleDeleteUser = async () => {
      showDeleteModal.value = false;
      const id = selectedUser.value.id;
      await ApiService.DELETE("/users/" + id)
        .then(() => {
          ToastUtils.success("Delete success");
          getUsers();
        })
        .catch((err) => {
          ToastUtils.error(err?.message);
        });
    };
    const changeModeForm = (v: "edit" | "view" | undefined) => {
      modeForm.value = v;
    };
    const btnAddClick = () => {
      selectedUser.value = new UserDto();
      isLoading.value = true;
      changeModeForm("edit");
      showConfirmBtn.value = true;
      isAddUser.value = true;
    };
    const btnEditClick = () => {
      isAddUser.value = false;
      isLoading.value = true;
      showConfirmBtn.value = true;
      changeModeForm("edit");
    };
    const btnDelClick = async () => {
      showDeleteModal.value = true;
    };
    const btnCancelClick = () => {
      isLoading.value = false;
      showConfirmBtn.value = false;
      changeModeForm("view");
    };
    const btnSubmitClick = () => {
      isLoading.value = false;
      showConfirmBtn.value = false;
      changeModeForm("view");
      // validate name
      if (selectedUser.value.name.length === 0) {
        errors.value.name = "Name is required";
      } else {
        errors.value.name = "";
      }
      // validate email
      if (selectedUser.value.email.length === 0) {
        errors.value.email = "Email is required";
      } else {
        errors.value.email = "";
      }
      // validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(selectedUser.value.email)) {
        errors.value.email = "Email address is not valid";
      } else {
        errors.value.email = "";
      }

      if (errors.value.name.length === 0 && errors.value.email.length === 0) {
        if (isAddUser.value) {
          handleAddUser();
        } else {
          handleEditUser();
        }
      }
    };

    onMounted(() => {
      getUsers();
    });
    return {
      btnAddClick,
      btnEditClick,
      btnDelClick,
      btnCancelClick,
      btnSubmitClick,
      handleEditUser,
      handleDeleteUser,
      handleAddUser,
      selectUser,
      users,
      showConfirmBtn,
      modeForm,
      selectedUser,
      errors,
      showDeleteModal,
      isLoading,
      isAddUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-content {
  margin: auto;
  width: 100%;
  height: 800px;
  display: flex;
  gap: 30px;

  .c-l-user {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;

    .loading-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .l-users {
      list-style-type: none;
      padding: 0;
      text-align: center;

      .header {
        font-weight: bold;
      }

      .content {
        height: 700px;
        overflow-y: scroll;
      }

      li {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-top: 5px;
        padding: 10px;
        background-color: #f0f0f0;
      }

      .seletected {
        background-color: #ffa7a7;
      }
    }
  }

  hr {
    width: 1px;
    height: 100%;
    background-color: #000;
  }

  .c-function {
    width: 50%;
    height: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;

    .c-btn-ced {
      text-align: right;

      button {
        width: auto;
        height: 30px;
        margin: 10px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    textarea {
      width: 80%;
      height: 500px;
      margin: auto;
    }
  }
}
</style>
