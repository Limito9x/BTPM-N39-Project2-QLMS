<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Mượn Sách</h2>
        </div>
        <table class="borrow-table">
          <thead>
            <tr>
              <th>Mã mượn sách</th>
              <th>Mã đọc giả</th>
              <th>Mã Sách</th>
              <th>Ngày mượn</th>
              <th>Ngày trả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrowbook in borrowbooks" :key="borrowbook.maMuon">
              <td>{{ borrowbook.maMuon }}</td>
              <td>{{ borrowbook.madocgia }}</td>
              <td>{{ borrowbook.masach }}</td>
              <td>{{ borrowbook.ngaymuon }}</td>
              <td>{{ borrowbook.ngaytra }}</td>
              <td>
                <button @click="deleteBorrowBook(borrowbook.maMuon)" class="delete">XÓA</button>
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
import FormAddBook from "@/components/formAddBook.vue";
import axios from "axios";
import borrowBookService from "@/services/borrowBook.service";

export default {
  components: {
    Navbar,
    Header,
    FormAddBook,
  },
  data() {
    return {
      borrowbooks: [], 
      showForm: false,
    };
  },
  methods: {
    async fetchBorrowbooks() { // [GET]
      try {
        const response = await borrowBookService.getAllBorrowBook(); 
        this.borrowbooks = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách mượn sách:", error);
      }
    },
    async deleteBorrowBook(id) { // [DELETE]
      if (!confirm("Bạn có chắc chắn muốn xóa dòng này?")) return;
      try {
        await borrowBookService.deleteBorrowBook(id);
        this.fetchBorrowbooks();
        console.log("Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa :", error);
      }
    },
    async editBook(book) { 
      try {
        const updatedBook = { ...book, tensach: updatedTitle }; 
        const response = await borrowBookService.updateBorrowBook(book.maMuon,book);

        this.books = this.books.map(b => (b._id === book._id ? response.data : b));

        console.log("Chỉnh sửa thông tin mượn sách thành công!", response.data);
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa:", error);
      }
    }, 
  },
  mounted() {
    this.fetchBorrowbooks();
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

.borrow-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.borrow-table th, .borrow-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.borrow-table th {
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

