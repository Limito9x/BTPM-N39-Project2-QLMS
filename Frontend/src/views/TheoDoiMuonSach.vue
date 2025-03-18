<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <div class="top-bar">
          <h2>Danh Sách Mượn Sách</h2>
        </div>
        <div class="borrowBook-list">
          <div class="borrowBook-card" v-for="borrowbook in borrowbooks" :key="borrowbook.maMuon">
            <h3>Thẻ mượn sách: {{ borrowbook.maMuon }}</h3>
            <p><strong>Mã đọc giả: </strong> {{ borrowbook.madocgia }}</p>
            <p><strong>Mã sách: </strong> {{ borrowbook.masach }}</p>
            <p><strong>Ngày mượn: </strong> {{ borrowbook.ngaymuon }}</p>
            <p><strong>Ngày đăng ký trả: </strong> {{ borrowbook.ngaytra }}</p>
            <div class="actions">
              <button @click="deleteBorrowBook(borrowbook.maMuon)" class="delete">XÓA</button>
              <button @click="openEditForm(borrowbook)" class="edit">Chỉnh sửa</button>
            </div>
          </div>
          <FormEditBorrow v-if="showEditForm" 
            :borrowbook="selectedBorrowBook" 
            @edit-borrowBook="editBorrowBook"
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
import FormEditBorrow from "@/components/formEditBorrow.vue";
import borrowBookService from "@/services/borrowBook.service";

export default {
  components: {
    Navbar,
    Header,
    FormAddBook,
    FormEditBorrow,
  },
  data() {
    return {
      borrowbooks: [], 
      showForm: false, 
      showEditForm: false,
      selectedBorrowBook: null,
    };
  },
  methods: {
    async fetchBorrowbooks() { // [GET]
      try {
        const response = await borrowBookService.getAllBorrowBook(); 
        this.borrowbooks = response.data;
      } catch (error) {
        console.error(`lỗi khi mượn sách ${error}`);
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
    openEditForm(borrowbook) {
      this.selectedBorrowBook = { ...borrowbook }; // Lưu sách đang chỉnh sửa
      this.showEditForm = true; // Hiển thị form chỉnh sửa
    },

    async editBorrowBook(updatedBook) {
      try {
        await borrowBookService.updateBorrowBook(updatedBook.maMuon, updatedBook);
        this.borrowbooks = this.borrowbooks.map(book =>
          book.maMuon === updatedBook.maMuon ? updatedBook : book
        );
        this.showEditForm = false; // Đóng form sau khi cập nhật
        console.log("Chỉnh sửa thành công!", updatedBook);
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

.borrowBook-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.borrowBook-card {
  background: #EEEEEE;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.borrowBook-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.borrowBook-card h3 {
  text-align: center;
  /* text-transform: uppercase; */
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

