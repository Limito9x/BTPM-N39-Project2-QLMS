<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <ul v-if="role === 'reader' || role === null">
      <li>
        <router-link to="/">
          <i class="fas fa-home"></i>
          <span v-if="!isCollapsed">Trang Chủ</span>
        </router-link>
      </li>
      <li>
        <router-link to="/history">
          <i class="fas fa-history"></i>
          <span v-if="!isCollapsed">Lịch sử mượn</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          <i class="fas fa-user"></i>
          <span v-if="!isCollapsed">Tài khoản</span>
        </router-link>
      </li>
    </ul>

    <ul v-else-if="role === 'staff'">
      <li>
        <router-link to="/admin/">
          <i class="fas fa-cogs"></i>
          <span v-if="!isCollapsed">Quản lý Sách</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/reader">
          <i class="fas fa-users"></i>
          <span v-if="!isCollapsed">Quản lý Đọc Giả</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/nhanvien">
          <i class="fas fa-user-tie"></i>
          <span v-if="!isCollapsed">Quản lý Nhân Viên</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/nxb">
          <i class="fas fa-building"></i>
          <span v-if="!isCollapsed">Quản lý Nhà Xuất Bản</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/theodoimuonsach">
          <i class="fas fa-user-cog"></i>
          <span v-if="!isCollapsed">Quản lý mượn sách</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: null,
      isCollapsed: false
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user ? user.role : null;
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    checkScreen() {
      this.isCollapsed = window.innerWidth < 768;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: linear-gradient(to bottom, #4b79a1, #283e51);
  color: white;
  min-height: 100vh;
  margin-top: 74px;
  padding: 20px 10px;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

li:last-child {
  border-bottom: none;
}

a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

a:hover {
  background: rgba(255, 255, 255, 0.2);
  padding-left: 10px;
  border-radius: 5px;
  transition: 0.3s;
}

.sidebar.collapsed span {
  display: none;
}
</style>
