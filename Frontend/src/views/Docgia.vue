<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Đọc Giả</h2>
        </div>

        <!-- Bảng danh sách độc giả -->
        <table class="reader-table">
          <thead>
            <tr>
              <th>Mã Độc Giả</th>
              <th>Password</th>
              <th>Họ Lót</th>
              <th>Tên</th>
              <th>Ngày Sinh</th>
              <th>Phái</th>
              <th>Địa Chỉ</th>
              <th>Số Điện Thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reader in readers" :key="reader.madocgia">
              <td>{{ reader.madocgia }}</td>
              <td>{{ reader.pass }}</td>
              <td>{{ reader.holot }}</td>
              <td>{{ reader.ten }}</td>
              <td>{{ reader.ngaysinh }}</td>
              <td>{{ reader.phai }}</td>
              <td>{{ reader.diachi }}</td>
              <td>{{ reader.dienthoai }}</td>
              <td>
                <button @click="deleteReader(reader.madocgia)" class="delete">XÓA</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormAddReader from "@/components/formAddStaff.vue";
import readerService from "@/services/reader.service";
import axios from "axios";

export default {
  components: {
    Navbar,
    Header,
    FormAddReader
  },
  data() {
    return {
      readers: [],
      showForm: false
    };
  },
  methods: {
    async fetchReaders() { 
      try {
        const response = await readerService.getAllReader(); 
        this.readers = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    
    async create(reader) { 
      try {
        await readerService.createReader(reader);
        await this.fetchReaders(); // Cập nhật lại sau khi thêm
        this.showForm = false; // Ẩn form sau khi lưu
        console.log("Thêm độc giả thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm độc giả:", error);
      }
    },

    async deleteReader(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa độc giả này?")) return;
      try {
        await readerService.deleteDocGia(id);
        await this.fetchReaders(); // cập nhật lại
        console.log("Xóa độc giả thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
      }
    }
  },
  mounted() {
    this.fetchReaders();
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
