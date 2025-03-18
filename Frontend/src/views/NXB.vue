<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Nhà Xuất Bản</h2>
        </div>
        <button @click="showForm = true" class="add">Thêm Nhà Xuất Bản</button>
        <FormAddNXB v-if="showForm" @add-nxb="create" @close="showForm = false" />

        <table class="nxb-table">
          <thead>
            <tr>
              <th>Mã Nhà Xuất Bản</th>
              <th>Tên Nhà Xuất Bản</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nxb in nxbs" :key="nxb.maNXB">
              <td>{{ nxb.maNXB }}</td>
              <td>{{ nxb.tennxb }}</td>
              <td>{{ nxb.diachi }}</td>
              <td>
                <button @click="deleteNXB(nxb.maNXB)" class="delete">XÓA</button>
                <button @click="openEditForm(nxb)" class="edit">Chỉnh sửa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <FormEditNXB
            v-if="showEditForm"
            :nxb="selectedNXB"
            @edit-nxb="editNXB" 
            @close="showEditForm = false" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormAddNXB from "@/components/formAddNXB.vue"
import FormEditNXB from "@/components/formEditNXB.vue";
import nxbService from "@/services/nxb.service";
import axios from "axios";

export default {
  components: {
    Navbar,
    Header,
    FormAddNXB,
    FormEditNXB,
  },
  data() {
    return {
      nxbs: [],
      showForm: false,
      showEditForm: false,
      selectedNXB: null,
    };
  },
  methods: {
    async fetchNXB() { 
      try {
        const response = await nxbService.getAllNXB(); 
        this.nxbs = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    
    async create(nxb) { 
      try {
        await nxbService.createNXB(nxb);

        //  kiểm tra thêm NXB đã tồn tại chưa
        
        await this.fetchNXB(); // Cập nhật danh sách sau khi thêm thành công
        this.showForm = false; // Ẩn form sau khi lưu
        console.log("Thêm độc giả thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm độc giả:", error);
      }
    },

    async deleteNXB(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa độc giả này?")) return;
      try {
        await nxbService.deleteNXB(id);
        await this.fetchNXB();
        console.log("Xóa độc giả thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
      }
    }, 

    openEditForm(nxb) {
      this.selectedNXB = { ...nxb};  
      console.log("NXB được chọn để chỉnh sửa:", this.selectedNXB);
      this.showEditForm = true;
    },

    async editNXB(updateNXB) {  
      try {
        console.log(updateNXB.maNXB);
        await nxbService.updateNXB(updateNXB.maNXB,updateNXB);
        await this.fetchNXB();
        this.showEditForm = false;
        console.log("Cập nhật sách thành công!");
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
      }
    }
  },
  mounted() {
    this.fetchNXB();
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

.nxb-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.nxb-table th, .nxb-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.nxb-table th {
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
