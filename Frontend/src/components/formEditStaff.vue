<template>
  <div class="form-overlay"> 
    <div class="form-container">
      <h3>Cập Nhật Nhân viên</h3>
      <label for="manv">Mã nhân viên</label>
      <input id="manv" v-model="editStaff.msnv" disabled/>  

      <label for="hoten">Họ tên nhân viên</label>
      <input id="hoten" v-model="editStaff.hotenNV"/>

      <label for="mk">Mật khẩu</label>
      <input id="mk" v-model="editStaff.password"/>
      
      <label for="chucvu">Chức vụ</label>
      <input id="chucvu" v-model="editStaff.chucvu"/>

      <label for="diachi">Địa chỉ</label>
      <input id="diachi" v-model="editStaff.diachi"/>

      <label for="sdt">Số điện thoại</label>
      <input id="sdt" v-model="editStaff.dienthoai"/>

      <!-- <label for="maMXB">Nguồn gốc/Tác giả</label>
      <input id="maMXB" v-model="book.maNXB" @blur="validateMaNXB"/>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p> -->


      <button @click="submitForm" class="submit">Lưu</button>
      <button @click="$emit('close')" class="cancel">Hủy</button>
    </div>
  </div>
</template>

<script>

export default {
    props: ["staff"],
    data() {
        return {
            editStaff: {...this.staff},
            errorMessage: "", 
        };
  },
  methods: {
    submitForm() {
        this.$emit("edit-staff", this.editStaff); // truyền ra cha
        this.resetForm();
    },
    resetForm() {
      this.editStaff = { msnv: "", hotenNV: "", password: "", chucvu: "", diachi: "", dienthoai: "", };
      this.errorMessage = "";
    }
  },
    watch: {
    staff(newStaff) {
      this.editStaff = { ...newStaff }; // Cập nhật dữ liệu khi `book` thay đổi
    }
  },
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
