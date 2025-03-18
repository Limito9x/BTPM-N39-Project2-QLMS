<template>
  <div class="form-overlay"> 
    <div class="form-container">
      <h3>Cập Nhật Sách</h3>
      <label for="masach">Mã sách</label>
      <input id="masach" v-model="editedBook.masach" disabled/>  

      <label for="tensach">Tên sách</label>
      <input id="tensach" v-model="editedBook.tensach"/>

      <label for="dongia">Đơn giá</label>
      <input id="dongia" v-model="editedBook.dongia"/>
      
      <label for="soquyen">Số quyểnn</label>
      <input id="soquyen" v-model="editedBook.soquyen"/>

      <label for="namsanxuat">Năm sản xuất</label>
      <input id="namsanxuat" v-model="editedBook.namsanxuat" type="date"/>

      <label for="maMXB">Mã nhà xuất bản</label>
      <input id="maMXB" v-model="editedBook.maNXB" @input="validateMaNXB"/>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

      <label for="nguongoc">Nguồn gốc/Tác giả</label>
      <input id="nguongoc" v-model="editedBook.nguongoc_tacgia"/>

      <button @click="submitForm" class="submit">Lưu</button>
      <button @click="$emit('close')" class="cancel">Hủy</button>
    </div>
  </div>
</template>

<script>
import nxbService from "@/services/nxb.service";

export default {
    props: ["book"],
    data() {
        return {
            editedBook: {...this.book},
            maNXBList: [], 
            errorMessage: "", 
        };
  },
  methods: {
    async fetchNXB() {
      try {
        const response = await nxbService.getAllNXB(); //[GET]
        this.maNXBList = response.data.map(nxb => nxb.maNXB); // danh sách mã NXB

      } catch (error) {
        console.error("Lỗi khi lấy danh sách NXB:", error);
      }
    },
    // lấy các nxb có trong bd
    validateMaNXB() {
      if (!this.maNXBList.includes(this.editedBook.maNXB)) {
        this.errorMessage = "Mã NXB không tồn tại trong hệ thống!";
      } else {
        this.errorMessage = "";
      }
    },
    submitForm() {
      this.validateMaNXB(); // Kiểm tra mã NXB trước khi gửi form
      if (this.errorMessage) return; // Nếu có lỗi thì không gửi form

      this.$emit("edit-book", this.editedBook);
      this.resetForm();
    },
    resetForm() {
      this.editedBook = { masach: "", tensach: "", dongia: "", soquyen: "", namsanxuat: "", maNXB: "", nguongoc_tacgia: "" };
      this.errorMessage = "";
    },
  },
    watch: {
        book(newBook) {
          this.editedBook = { ...newBook }; // Cập nhật dữ liệu khi prop thay đổi
        }
    },
    mounted() {
      this.fetchNXB(); 
    }
};
</script>


<style scoped>

.form-overlay {
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

.form-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

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

button {
  padding: 8px 15px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.cancel {
  background-color: red;
  color: white;
}

.submit {
background-color: green;
  color: white;
}
</style>
