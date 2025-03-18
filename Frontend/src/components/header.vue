<template>
  <header class="header">
    <div class="title">QUẢN LÝ MƯỢN SÁCH</div>
    <div class="actions">
      <!-- <button v-if="isLoggedIn" class="btn logout" @click="logout">Đăng xuất</button>
      <button v-else class="btn login" @click="gotoLogin">Đăng nhập</button> -->

      <div v-if="isLoggedIn" class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          {{ username }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Mặc định chưa đăng nhập
      username: "",
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push("/login"); 
    },
    logout() {
      localStorage.removeItem("user"); // Xóa trạng thái đăng nhập
      window.location.reload(); // Tải lại trang đó
    },
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("user"); // Kiểm tra trạng thái đăng nhập
    }
  },
  mounted() {
    this.checkLoginStatus();
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #ff7e5f, #ffb199);
  padding: 15px 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.btn {
  background: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.logout {
  margin-left: 10px;
  background: #ff4d4d;
  color: white;
}

.login {
  background: #4CAF50;
  color: white;
}
</style>
