<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Sách</h2>
        </div>
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
              <button class="borrow" @click="openBorrowForm(book)">Mượn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Form mượn sách -->
    <FormBorrowBook 
      v-if="showBorrowForm" :show="showBorrowForm" :book="selectedBook" 
      @close="showBorrowForm = false"/>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormBorrowBook from "@/components/formBorrowBook.vue"; // Import form mượn sách
import axios from "axios";
import bookService from "@/services/book.service";

export default {
  components: {
    Navbar,
    Header,
    FormBorrowBook,
  },
  data() {
    return {
      books: [], 
      selectedBook: null,  
      showBorrowForm: false,
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await bookService.getAllBook();
        this.books = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    openBorrowForm(book) {
      const user = JSON.parse(localStorage.getItem("user"));
      const madocgia = user ? user.id : null;
      if (!madocgia) {
        alert("Bạn cần đăng nhập dể mượn sách!!!");
        // chuyển sang trang đăng nhập
        this.$router.push("/login");
      }

      // console.log("Trạng thái",this.showBorrowForm)
      // console.log("Mở form mượn sách:", book);
      this.selectedBook = {...book, madocgia};
      this.showBorrowForm = true;
    },
  },
  mounted() {
    this.fetchBooks();
  },
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
  margin-top: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.book-card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.borrow {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>


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
  margin-top: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.book-card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.edit {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
