import createAPI from "./api.service";

export default {
  getAllReader() {
    return createAPI.get("/reader");
  },

  createReader(readerData){
    return createAPI.post("/reader",readerData)
  },

  updateReader(id, updateData) {
    return createAPI.put(`/reader/${id}`, updateData);
  },

  deleteDocGia(id) {
    return createAPI.delete(`/reader/${id}`);
  },

  getByIdUser(id) {
    return createAPI.get(`/reader/${id}`);
  },
};
