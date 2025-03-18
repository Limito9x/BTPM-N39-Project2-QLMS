<template>
  <div class="sidebar">
    <ul v-if="role === 'reader' || role === null">
      <li>
        <router-link to="/">
          <i class="fas fa-home"></i> Trang Chủ
        </router-link>
      </li>
      <li>
        <router-link to="/history">
          <i class="fas fa-history"></i> Lịch sử mượn
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          <i class="fas fa-user"></i> Tài khoản
        </router-link>
      </li>
    </ul>

    <ul v-else-if="role === 'staff'">
      <li>
        <router-link to="/admin/">
          <i class="fas fa-cogs"></i> Quản lý Sách
        </router-link>
      </li>
      <li>
        <router-link to="/admin/reader">
          <i class="fas fa-users"></i> Quản lý Đọc Giả
        </router-link>
      </li>
      <li>
        <router-link to="/admin/nhanvien">
          <i class="fas fa-user-tie"></i> Quản lý Nhân Viên
        </router-link>
      </li>
      <li>
        <router-link to="/admin/nxb">
          <i class="fas fa-building"></i> Quản lý Nhà Xuất Bản
        </router-link>
      </li>
      <li>
        <router-link to="/admin/theodoimuonsach">
          <i class="fas fa-user-cog"></i> Quản lý mượn sách
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
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user ? user.role : null;
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
  padding: 20px 20px 10px 15px;
  /* position: fixed; */
  top: 74px; 
  left: 0;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 8px;
  font-size: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

ul li:last-child {
  border-bottom: none;
}

ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

ul li a:hover {
  background: rgba(255, 255, 255, 0.2);
  padding-left: 10px;
  border-radius: 5px;
  transition: 0.3s;
}

i {
  font-size: 16px;
}
</style>
