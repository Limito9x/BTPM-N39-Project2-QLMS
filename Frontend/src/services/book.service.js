import createAPI from "./api.service";

export default {
  getAllBook() {
    return createAPI.get("/sach");
  },
  
  getBookByID(id) {
    return createAPI.get(`/sach/${id}`);
  },

  createBook(bookData) {
    return createAPI.post("/sach", bookData);
  },

  updateBook(id, updateData) {
    return createAPI.put(`/sach/${id}`, updateData);
  },

  deleteBook(id) {
    return createAPI.delete(`/sach/${id}`);
  },
};
