<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header @search="searchBooksByReader"/>
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Sách</h2>
        </div>
        <div class="book-list">
          <div class="book-card" v-for="book in books" :key="book.masach">
            <h3>{{ book.tensach }}</h3>
            <p><strong>Mã Sách:</strong> {{ book.masach }}</p>
            <p><strong>Đơn Giá:</strong> {{ book.dongia }} VND</p>

            <div class="book-quantity">
              <p><strong>Số Quyển:</strong></p>
              <span class="quantity-box">{{ book.soquyen }}</span>
            </div>

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

    // tìm kiếm theo tên
    async searchBooksByReader(query) {
      try {
        const response = await bookService.getBookByName(query);
        this.books = response.data;
      } catch (error) {
        console.log(` lỗi khi tìm kiếm ${error}`)
      }
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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

</style>
