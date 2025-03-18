<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Nhân Viên</h2>
        </div>
        <button @click="showForm = true" class="add">Thêm Nhân viên</button>
        <!-- Hiển thị form khi showForm = true -->
        <FormAddStaff v-if="showForm"
        @add-staff="create"
        @close="showForm = false" />

        <!-- Bảng danh sách độc giả -->
        <table class="reader-table">
          <thead>
            <tr>
              <th>Mã Số Nhân Viên</th>
              <th>Họ Tên Nhân Viên</th>
              <th>Chức Vụ</th>
              <th>Địa Chỉ</th>
              <th>Số Điện Thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="staff in staffs" :key="staff.msnv">
              <td>{{ staff.msnv }}</td>
              <td>{{ staff.hotenNV }}</td>
              <td>{{ staff.chucvu  }}</td>
              <td>{{ staff.diachi }}</td>
              <td>{{ staff.dienthoai }}</td>
              <td>
                <button @click="deleteStaff(staff.msnv)" class="delete">XÓA</button>
                <button @click="openEditForm(staff)" class="edit">Chỉnh sửa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <FormEditStaff 
            v-if="showEditForm"
            :staff="selectedStaff"
            @edit-staff="editStaff" 
            @close="showEditForm = false" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormAddStaff from "@/components/formAddStaff.vue";
import axios from "axios";
import FormEditStaff from "@/components/formEditStaff.vue";
import staffService from "@/services/staff.service";

export default {
  components: {
    Navbar,
    Header,
    FormAddStaff,
    FormEditStaff,
  },
  data() {
    return {
      staffs: [],
      showForm: false,
      selectedStaff: null,
      showEditForm : false,
    };
  },
  methods: {
    async fetchStaffs() { 
      try {
        const response = await staffService.getAllStaff(); 
        this.staffs = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    
    async create(staff) { 
      try {
        await staffService.createStaff(staff);
        await this.fetchStaffs(); // Cập nhật danh sách sau khi thêm thành công
        this.showForm = false; // Ẩn form sau khi lưu
        console.log("Thêm nhân viên thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
      }
    },

    async deleteStaff(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
      try {
        await staffService.deleteStaff(id);
        await this.fetchStaffs();
        console.log("Xóa nhân viên thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
      }
    },
    openEditForm(nhanvien) {
      this.selectedStaff = { ...nhanvien };  
      this.showEditForm = true;
    },

    async editStaff(updatedStaff) {  
      try {
        console.log(updatedStaff.msnv);
        await staffService.updateStaff(updatedStaff.msnv,updatedStaff);
        await this.fetchStaffs();
        this.showEditForm = false;
        console.log("Cập nhật sách thành công!");
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
      }
    }
  },

  mounted() {
    this.fetchStaffs();
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 70px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-content {
  margin-top: 20px
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.reader-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.reader-table th, .reader-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.reader-table th {
  background-color: #f2f2f2;
}

.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.edit {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.add{
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
button {
  margin-left: 5px;
}
</style>
