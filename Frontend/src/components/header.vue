<template>
  <header class="header">
    <div class="title">NHÀ SÁCH ABC</div>

    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Nhập vào từ khóa tìm kiếm..." />
      <button class="btn search-btn" @click="$emit('search', searchQuery)">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>

    <div class="actions">
      <div v-if="isLoggedIn" class="full-info">
        <span class="username">Xin chào {{ username }}</span>
        <button class="btn logout" @click="logout">Đăng xuất</button>
      </div>
      <div v-if="isLoggedIn" class="icon-only" @click="logout" title="Đăng xuất">
        <i class="fa-solid fa-right-from-bracket fa-lg"></i>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(to right, #ff7e5f, #ffb199);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: nowrap;
  height: 75px;
  overflow-x: auto;
}

.title {
  white-space: nowrap;
  margin-right: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  max-width: 500px;
  min-width: 120px;
}

.search-bar input {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 100%;
  font-size: 16px;
}

.search-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-left: 6px;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Hiển thị đầy đủ thông tin người dùng */
.full-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Icon logout thu gọn */
.icon-only {
  display: none;
  cursor: pointer;
  color: white;
}

.username {
  font-size: 16px;
}

.btn {
  background: #ccc;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}

.logout {
  background: #ff4d4d;
  color: white;
}

.login {
  background: #4caf50;
  color: white;
}

/* PHẦN DƯỚI HEADER */
.main-content {
  margin-top: 80px;
  padding: 20px;
}

/* RESPONSIVE: chỉ ẩn full-info và hiện icon logout */
@media (max-width: 768px) {
  .full-info {
    display: none;
  }

  .icon-only {
    display: inline-block;
  }
}
</style>
