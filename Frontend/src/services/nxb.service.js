import createAPI from "./api.service";

export default {
  getAllNXB() {
    return createAPI.get("/nxb");
  },

  getNXBbyID(id) {
    return createAPI.get(`/nxb/${id}`);
  },

  getNXBByName(name) {
    return createAPI.get(`/nxb?ten=${encodeURIComponent(name)}`);
  },

  createNXB(Data) {
    return createAPI.post("/nxb", Data);
  },

  updateNXB(id, updateData) {
    return createAPI.put(`/nxb/${id}`, updateData);
  },

  deleteNXB(id) {
    return createAPI.delete(`/nxb/${id}`);
  },
};
