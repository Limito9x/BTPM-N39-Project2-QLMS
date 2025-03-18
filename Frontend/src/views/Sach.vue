<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Sách</h2>
        </div>
        <!-- thêm nút add -->
        <button @click="showForm = true" class="add">Thêm Sách</button>
        <!-- Hiển thị form khi showForm = true -->
        <FormAddBook v-if="showForm" @add-book="create" @close="showForm = false" />

        <div class="book-list">
          <div class="book-card" v-for="book in books" :key="book.masach">
            <h3>{{ book.tensach }}</h3>
            <p><strong>Mã Sách:</strong> {{ book.masach }}</p>
            <p><strong>Đơn Giá:</strong> {{ book.dongia }}</p>
            <p><strong>Số Quyển:</strong> {{ book.soquyen }}</p>
            <p><strong>Năm Xuất Bản:</strong> {{ book.namsanxuat }}</p>
            <p><strong>Mã Nhà Xuất Bản:</strong> {{ book.maNXB }}</p>
            <p><strong>Nguồn Gốc/Tác Giả:</strong> {{ book.nguongoc_tacgia }}</p>
            <div class="actions">
              <button @click="deleteBook(book._id)" class="delete">XÓA</button>
              <button @click="openEditForm(book)" class="edit">Chỉnh sửa</button>
            </div>
          </div>

          <FormEditBook 
          v-if="showEditForm":book="selectedBook"
          @edit-book="editBook" 
          @close="showEditForm = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormAddBook from "@/components/formAddBook.vue";
import FormEditBook from "@/components/formEditBook.vue";
import bookService from "@/services/book.service";

export default {
  components: {
    Navbar,
    Header,
    FormAddBook,
    FormEditBook,
  },
  data() {
    return {
      books: [], 
      showForm: false,
      showEditForm: false,
      selectedBook: null,
    };
  },
  methods: {
    async fetchBooks() { 
      try {
        const response = await bookService.getAllBook(); 
        this.books = response.data;
        const iscount = this.books.length;
        console.log(iscount);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    async create(book) {  // [POST]
      try {
        book.soquyen = parseInt(book.soquyen);
        await bookService.createBook(book);
        await this.fetchBooks(); // Cập nhật danh sách sau khi thêm thành công
        this.showForm = false; // Ẩn form sau khi lưu
        console.log("Thêm sách thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
      }
    },
    async deleteBook(id) { // [DELETE]
      if (!confirm("Bạn có chắc chắn muốn xóa sách này?")) return;
      try {
        await bookService.deleteBook(id);
        this.books = this.books.filter(book => book._id !== id);
        console.log("Xóa sách thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
      }
    },
    openEditForm(book) {
      this.selectedBook = { ...book };  // Copy object để tránh ảnh hưởng trực tiếp
      this.showEditForm = true;
    },
    async editBook(updatedBook) {  
      try {
        await bookService.updateBook(updatedBook.masach,updatedBook);
        await this.fetchBooks();
        this.showEditForm = false;
        console.log("Cập nhật sách thành công!");
      } catch (error) {
          console.error("Lỗi khi cập nhật sách:", error);
      }
    }
  },

  mounted() {
    this.fetchBooks();
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

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.book-card {
  background: #EEEEEE;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.book-card h3 {
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

.book-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-box {
  display: inline-block;
  background-color: #ff7e5f; 
  color: white;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 8px;
  min-width: 40px;
  text-align: center;
  font-size: 14px;
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

.add{
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
