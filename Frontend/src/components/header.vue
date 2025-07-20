<template>
  <header class="header">
    <div class="title">NHÀ SÁCH ABC</div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Nhập vào từ khóa tìm kiếm..." />
      <button class="btn seach-btn" @click="() => { 
        $emit('search', searchQuery, searchCategory);
        showFilter=false;
        }">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <!-- Trong .search-bar -->
      <div class="filter-wrapper" v-if="isHomePage">
        <button class="btn filter-btn" @click="toggleFilter">
          <i class="fa fa-filter" style="margin-left: 8px; cursor: pointer;"></i>
        </button>

        <!-- Panel xổ xuống -->
        <div class="filter-panel" v-if="showFilter">
          <p>Lọc theo:</p>
          <select v-model="searchCategory">
            <option value="tensach">Tên sách</option>
            <option value="nguongoc_tacgia">Nguồn gốc/Tác giả</option>
            <option value="nhaxuatban">Nhà xuất bản</option>
          </select>
        </div>
      </div>

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
      showFilter: false,
      searchCategory: "tensach",
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
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    }
  },
  computed: {
    isHomePage() {
      return this.$route.name === "home";
    },
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
  gap: 3px;
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

.filter-wrapper {
  position: relative;
  display: inline-block;
}

.filter-panel {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 999;
  color: black;
  min-width: 270px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
