<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <Header @search="searchBooksByReader" />
      <div class="content">
        <div class="top-bar d-flex">
          <h2>Danh Sách Sách</h2>
          <div style="position: relative;">
            <button class="ml-4 d-flex filter-btn" @click="filterMenu = !filterMenu">
              <h5>Sắp xếp tìm kiếm</h5>
              <i class="fas fa-sort ml-2 mt-2"></i>
            </button>
            <div v-if="filterMenu" class="filter-menu">
              <ul>
                <li @click="sortBooks('name')" :class="{
                  active: atoz !== 'default'
                }">
                  Sắp xếp theo tên
                  <span v-if="atoz === 'asc'">A → Z</span>
                  <span v-else-if="atoz === 'desc'">Z → A</span>
                  <span v-else>A → Z</span>
                </li>

                <li @click="sortBooks('price')" :class="{
                  active: priceOrder !== 'default'
                }">
                  Sắp xếp theo giá
                  <span v-if="priceOrder === 'asc'">tăng dần</span>
                  <span v-else-if="priceOrder === 'desc'">giảm dần</span>
                  <span v-else>tăng dần</span>
                </li>
                <li @click="sortBooks('year')" :class="{
                  active: yearOrder !== 'default'
                }">
                  Sắp xếp theo năm xuất bản
                  <span v-if="yearOrder === 'desc'">mới → cũ</span>
                  <span v-else-if="yearOrder === 'asc'">cũ → mới</span>
                  <span v-else>mới → cũ</span>
                </li>
              </ul>
            </div>
          </div>
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
            <p><strong>Nhà xuất bản:</strong> {{ listNXB[book.maNXB] }}</p>
            <p><strong>Nguồn Gốc/Tác Giả:</strong> {{ book.nguongoc_tacgia }}</p>
            <div class="actions">
              <button class="borrow" @click="openBorrowForm(book)">Mượn</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form mượn sách -->
    <FormBorrowBook v-if="showBorrowForm" :show="showBorrowForm" :book="selectedBook" @close="showBorrowForm = false" />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Header from "@/components/header.vue";
import FormBorrowBook from "@/components/formBorrowBook.vue";
import bookService from "@/services/book.service";
import nxbService from "@/services/nxb.service";

export default {
  components: {
    Navbar,
    Header,
    FormBorrowBook,
  },
  data() {
    return {
      books: [],
      orgBooks: [],
      cloneBook: [],
      listNXB: {},
      selectedBook: null,
      showBorrowForm: false,
      filterMenu: false,
      atoz: "default",
      priceOrder: "default",
      yearOrder: "default",
    };
  },
  methods: {
    async fetchNXB() {
      try {
        for (let book of this.books) {
          if (!this.listNXB[book.maNXB]) {
            const response = await nxbService.getNXBbyID(book.maNXB);
            this.listNXB[book.maNXB] = response.data.tennxb;
          }
        }
      } catch (error) {
        console.log("lỗi");
      }
    },
    async fetchBooks() {
      try {
        const response = await bookService.getAllBook();
        this.books = response.data;
        this.cloneBooks = [...this.books];
        this.orgBooks = [...this.books];

        await this.fetchNXB();
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
      this.selectedBook = { ...book, madocgia };
      this.showBorrowForm = true;
    },

    // tìm kiếm theo tên 
    // sửa lại theo tên sách hoặc tác giả
    async searchBooksByReader(query,searchCategory) {
      try {
        const lowerQuery = query.trim().toLowerCase();
        if (searchCategory === "nhaxuatban") {
          // Trường hợp tìm theo tên nhà xuất bản
          this.books = this.orgBooks.filter(book => {
            const tenNXB = this.listNXB[book.maNXB]?.toLowerCase() || "";
            return tenNXB.includes(lowerQuery);
          });
        } else {
          // Trường hợp tìm trực tiếp từ thuộc tính trong book
          this.books = this.orgBooks.filter(book =>
            book[searchCategory]?.toLowerCase().includes(lowerQuery)
          );
        }
        this.cloneBooks = [...this.books];
        this.resetAll();
      } catch (error) {
        console.log(` lỗi khi tìm kiếm ${error}`)
      }
    },
    resetAll() {
      this.atoz = "default";
      this.priceOrder = "default";
      this.yearOrder = "default";
    },
    checkDefaultOther(activeCategory) {
      const sortMap = {
        name: ["priceOrder", "yearOrder"],
        price: ["atoz", "yearOrder"],
        year: ["atoz", "priceOrder"]
      };
      if (sortMap[activeCategory]) {
        sortMap[activeCategory].forEach(key => {
          this[key] = "default";
        });
      }
    },

    sortBooks(category) {
      this.checkDefaultOther(category);
      if (category === "name") {
        if (this.atoz === "default") {
          this.atoz = "asc";
          this.books.sort((a, b) => a.tensach.localeCompare(b.tensach));
        }
        else if (this.atoz === "asc") {
          this.atoz = "desc";
          this.books.sort((a, b) => b.tensach.localeCompare(a.tensach));
        }
        else {
          this.atoz = "default";
          this.books = [...this.cloneBooks];
        };
      }
      if (category === "price") {
        if (this.priceOrder === "default") {
          this.priceOrder = "asc";
          this.books.sort((a, b) => a.dongia.localeCompare(b.dongia));
        }
        else if (this.priceOrder === "asc") {
          this.priceOrder = "desc";
          this.books.sort((a, b) => b.dongia.localeCompare(a.dongia));
        }
        else {
          this.priceOrder = "default";
          this.books = [...this.cloneBooks];
        };
      }
      if (category === "year") {
        if (this.yearOrder === "default") {
          this.yearOrder = "desc";
          this.books.sort((a, b) => b.namsanxuat.localeCompare(a.namsanxuat));
        }
        else if (this.yearOrder === "desc") {
          this.yearOrder = "asc";
          this.books.sort((a, b) => a.namsanxuat.localeCompare(b.namsanxuat));
        }
        else {
          this.yearOrder = "default";
          this.books = [...this.cloneBooks];
        };
      }
    }
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

.filter-btn {
  background-color: #2992cf;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
}

.filter-btn:hover {
  background-color: #1772af;
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

.filter-menu ul li:hover {
  color: #007bff;
}

.active {
  color: #007bff;
  text-decoration: underline;
  font-weight: bold;
}
</style>
