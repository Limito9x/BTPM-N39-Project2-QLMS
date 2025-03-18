<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Độc Giả</h2>
        </div>

        <div class="reader-list">
          <div class="reader-card" v-for="reader in readers" :key="reader.madocgia">
            <h3>{{ reader.holot }} {{ reader.ten }}</h3>
            <p><strong>Mã đọc giả/Tên tài khoản:</strong> {{ reader.madocgia }}</p>
            <p><strong>Ngày sinh:</strong> {{ reader.ngaysinh }}</p>
            <p><strong>Phái:</strong> {{ reader.phai }}</p>
            <p><strong>Địa Chỉ:</strong> {{ reader.diachi }}</p>
            <p><strong>Số điện thoại:</strong> {{ reader.dienthoai }}</p>
            <p><strong>Mật khẩu:</strong> {{ reader.pass }}</p>
            <div class="actions">
              <button @click="deleteReader(reader.madocgia)" class="delete">XÓA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormAddReader from "@/components/formAddStaff.vue";
import readerService from "@/services/reader.service";

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
  background: #f8f9fa;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.content {
  background: #ffffff;
  padding: 20px;
  margin-top: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reader-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.reader-card {
  background: #EEEEEE;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.reader-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.reader-card h3 {
  text-align: center;
  text-transform: uppercase;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
}

p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.borrow {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
}

.borrow:hover {
  background-color: #218838;
}

.edit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
}

.edit:hover {
  background-color: #0056b3;
}

.delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
}

.delete:hover {
  background-color: #c82333;
}

.add {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>