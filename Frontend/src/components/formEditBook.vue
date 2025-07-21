<template>
  <div class="form-overlay">
    <div class="form-container">
      <h3>Cập Nhật Sách</h3>
      <label for="masach">Mã sách</label>
      <input id="masach" v-model="editedBook.masach" disabled />

      <label for="tensach">Tên sách</label>
      <input id="tensach" v-model="editedBook.tensach" />

      <label for="dongia">Đơn giá</label>
      <input id="dongia" v-model="editedBook.dongia" />

      <label for="soquyen">Số quyểnn</label>
      <input id="soquyen" v-model="editedBook.soquyen" />

      <label for="namsanxuat">Năm sản xuất</label>
      <input id="namsanxuat" v-model="editedBook.namsanxuat" type="date" />
      <label for="maNXB">Nhà Xuất Bản</label>
      <label for="maNXB">Nhà Xuất Bản</label>
      <select v-model="editedBook.maNXB" id="maNXB">
        <option disabled value="">-- Chọn nhà xuất bản --</option>
        <option v-for="nxb in publishers" :key="nxb.maNXB" :value="nxb.maNXB">
          {{ nxb.tennxb }}
        </option>
      </select>

      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

      <label for="nguongoc">Nguồn gốc/Tác giả</label>
      <input id="nguongoc" v-model="editedBook.nguongoc_tacgia" />

      <button @click="submitForm" class="submit">Lưu</button>
      <button @click="$emit('close')" class="cancel">Hủy</button>
    </div>
  </div>
</template>

<script>
import nxbService from "@/services/nxb.service";

export default {
  props: ["book"], // lấy dữ liệu từ view/sach
  data() {
    return {
      editedBook: { ...this.book }, // k để ảnh hưởng đến cha
      publishers: [],
      errorMessage: "",
    };
  },
  methods: {
    async fetchNXB() {
      try {
        const response = await nxbService.getAllNXB(); //[GET]
        this.publishers = response.data;

      } catch (error) {
        console.error("Lỗi khi lấy danh sách NXB:", error);
      }
    },
    // validateMaNXB() {
    //   if (!this.editedBook.maNXB) {
    //     this.errorMessage = "Bạn chưa nhập mã nhà xuất bản";
    //     return;
    //   } 
    //   else {
    //     if (!this.maNXBList.includes(this.editedBook.maNXB)) {
    //       this.errorMessage = "Mã NXB không tồn tại trong hệ thống!";
    //     } else {
    //       this.errorMessage = "";
    //     }
    //   }
    // },
    submitForm() {
      // this.validateMaNXB(); 
      // if (this.errorMessage) return; 

      this.$emit("edit-book", this.editedBook);
      // this.editedBook = { masach: "", tensach: "", dongia: "", soquyen: "", namsanxuat: "", maNXB: "", nguongoc_tacgia: "" };
      this.errorMessage = "";
    },
  },
  watch: {
    book(newBook) {
      this.editedBook = { ...newBook };
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

input,
select {
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
