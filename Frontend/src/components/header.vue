<template>
  <header class="header">
    <div class="title">NHÀ SÁCH ABC</div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" 
      placeholder="Nhập vào từ khóa tìm kiếm...">
      <button class="btn seach-btn" @click="$emit('search',searchQuery)">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
    <div class="actions">
      <div v-if="isLoggedIn">
        <span class="username">Xin chào {{ username }}</span>
        <button class="btn logout" @click="logout">Đăng xuất</button>
      </div>
      <button v-else class="btn login" @click="gotoLogin">Đăng nhập</button>
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
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.isLoggedIn = true;
        this.username = user.username; // Lấy tên người dùng từ localStorage
      }
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
  background: #ccc;
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

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 500px;
}

.search-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 10px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 5px;
}

</style>
