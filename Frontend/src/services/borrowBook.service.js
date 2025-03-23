import createAPI from "./api.service";

export default {
  getAllBorrowBook() {
    return createAPI.get("/theodoimuonsach");
  },

  getBorrowBookByName(name) {
    return createAPI.get(`/theodoimuonsach?ten=${encodeURIComponent(name)}`);
  },

  createBorrowBook(Data) {
    return createAPI.post("/theodoimuonsach", Data);
  },

  updateBorrowBook(id, updateData) {
    return createAPI.put(`/theodoimuonsach/${id}`, updateData);
  },

  deleteBorrowBook(id) {
    return createAPI.delete(`/theodoimuonsach/${id}`);
  },

  getByIdUser(id) {
    return createAPI.get(`/theodoimuonsach/${id}`);
  },
};
