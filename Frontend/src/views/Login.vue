<template>
  <div class="login-container">
    <div class="login-box">
      <div class="tabs">
        <span :class="{ active: isLogin }" @click="isLogin = true">Login</span>
        <span :class="{ active: !isLogin }" @click="isLogin = false">Sign Up</span>
      </div>

      <!-- Form Đăng Nhập -->
      <form v-if="isLogin" @submit.prevent="login">
        <input v-model="loginData.tendangnhap" placeholder="Tên đăng nhập" required />
        <input v-model="loginData.password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>

      <!-- Form Đăng Ký -->
      <form v-else @submit.prevent="register">
        <input v-model="registerData.madocgia" @input="checkMadocgia" placeholder="Tên đăng nhập" required />
        <p v-if="madocgiaError" style="color: #fff; font-size: 13px;">{{ madocgiaError }}</p>
        <input v-model="registerData.holot" placeholder="Họ lót" required />
        <input v-model="registerData.ten" placeholder="Tên" required />
        <input
          v-model="registerData.ngaysinh"
          type="text"
          placeholder="Ngày sinh"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
        />
        <select v-model="registerData.phai" placeholder="Giới tính">
          <option value="gt" disabled>Giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <input v-model="registerData.diachi" placeholder="Địa chỉ"  />
        <input v-model="registerData.dienthoai" placeholder="Số điện thoại" required />
        <input v-model="registerData.pass" type="password" placeholder="Mật khẩu" required />
        <input v-model="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script>
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import { error } from "jquery";

export default {
  data() {
    return {
      isLogin: true, // Mặc định là login
      loginData: {
        tendangnhap: "",
        password: ""
      },
      registerData: {
        holot: "",
        ten: "",
        ngaysinh: "",
        phai: "gt",
        diachi: "",
        dienthoai: "",
        pass: "",
        madocgia: "",
      },
      confirmPassword: "",
      madocgiaError:""
    };
  },
  methods: {
    async checkMadocgia() {
      if (!this.registerData.madocgia){
        this.madocgiaError=""
        return;
      }

      try {
        const readerRes = await readerService.getAllReader();
        const madocgiaList = readerRes.data.map(reader => reader.madocgia);
        if (madocgiaList.includes(this.registerData.madocgia)) {
          this.madocgiaError = "Tên đăng nhập đã tồn tại!"
        } else {
          this.madocgiaError="";
        }
      }
      catch (error) {
        console.error("Lỗi")
      }
    },

    async login() {
      try {
        // lấy ds đọc giả và nhân viên
        const readerRes = await readerService.getAllReader();
        const staffRes = await staffService.getAllStaff();

        // kiểm tra ai là người đang đăng nhập
        const user = readerRes.data.find(reader => reader.madocgia === this.loginData.tendangnhap)

        const staff = staffRes.data.find(staff => staff.msnv === this.loginData.tendangnhap)

        if (user && user.pass === this.loginData.password) {
          alert("Đăng nhập thành công với tư các Đọc Giả");
          this.$router.push("/");
          localStorage.setItem("user", JSON.stringify({ id: user.madocgia, role: "reader" }));
          this.$router.push("/");
        }
        else if (staff && staff.password === this.loginData.password) {
          alert("Đăng nhập thành công với tư cách Nhân Viên!");
          localStorage.setItem("user", JSON.stringify({ id: staff.msnv, role: "staff" }));
          this.$router.push("/admin/"); 
        }  
        else {
          alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
      } 
      catch (error) {
        console.error("Lỗi khi đăng nhập",error);
      }
    },

    async register() {
      try {
      //  kiểm tra thêm tendangnhap đã tồn tại chưa
      // const readerRes = await readerService.getAllReader();
      // console.log(readerRes);

      // const madocgiaList = readerRes.data.map(reader => reader.madocgia);
      // console.log("Danh sách mã độc giả:", madocgiaList);
      if (this.madocgiaError){
        alert("Chọn tên khác");
        return;
      }
      //  Mật khẩu từ 5 số trở lên

      // kiểm tra mật khẩu trùng khớp
      if (this.registerData.pass !== this.confirmPassword) {
        alert("Mật khẩu không trùng khớp!");
        return;
      }
      
      await readerService.createReader(this.registerData);

      alert("Đăng ký thành công! Hãy đăng nhập.");
      this.isLogin = true; // Chuyển về trang đăng nhập
      } catch (error) {
        console.error("Lỗi khi tạo tài khoản:", error);
        alert(`Có lỗi xảy ra, vui lòng thử lại. ${error}`);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #56ccf2, #2f80ed);
}

.login-box {
  background: #222;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  color: white;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.tabs span {
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
}

.tabs .active {
  border-bottom: 2px solid white;
}

input, select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
}

button {
  width: 100%;
  padding: 10px;
  background: #27ae60;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #219150;
}
</style>
