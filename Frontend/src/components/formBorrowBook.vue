<template>
  <div class="borrow-form-overlay" v-if="show">
    <div class="borrow-form">
      <h2>Mượn Sách</h2>
      <div>
        <label>Mã Đọc Giả:</label>
        <input v-model="borrowBook.madocgia" type="text" readonly />
      </div>

      <div>
        <label>Mã Sách:</label>
        <input v-model="borrowBook.masach" type="text" readonly />
      </div>
      <div>
        <label>Ngày Mượn:</label>
        <input v-model="borrowBook.ngaymuon" type="date"/>
      </div>

      <div class="form-actions">
        <button @click="$emit('close')" class="cancel">Hủy</button>
        <button @click="submitForm" class="confirm">Mượn</button>
      </div>
    </div>
  </div>
</template>

<script>
import borrowBookService from "@/services/borrowBook.service";

export default {
  props: ["show","book"], 
  data() {
    return {
      borrowBook: {
        maMuon: this.generateID(),
        madocgia: this.book.madocgia,
        masach: this.book.masach,
        ngaymuon: "",
      }
    };
  },
  watch: {
    book(newBook) {
      if (newBook) {
        this.borrowBook.masach = newBook.masach; 
      }
    }
  },
  methods: {
    generateID() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0"); 
      const year = now.getFullYear();
      return `MM${this.book.madocgia}_${this.book.masach}_${day}${month}${year}`;
    },
    async submitForm() {
      if (!this.borrowBook.ngaymuon ) {
        alert("Vui lòng chọn ngày mượn");
        return;
      }
      
      try {
        await borrowBookService.createBorrowBook(this.borrowBook);
        alert("Mượn sách thành công!");
        window.location.reload();
        this.$emit("close"); // Đóng form
      } catch (error) {
        console.error(` lỗi khi mượn sách ${error}`);
        console.log(error.response)
        alert(error.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  font-weight: bold;
  text-align: left;
  margin: 10px 0px 0px 0px;
}

input, select {
  width: 100%;
  margin: 2px 0 0 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.borrow-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.borrow-form {
  background: white;
  padding: 18px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.borrow-form h2 {
    text-align: center;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.confirm {
  background-color: green;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;

}

.cancel {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
