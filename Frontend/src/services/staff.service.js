import createAPI from "./api.service";

export default {
  getAllStaff() {
    return createAPI.get("/nhanvien");
  },

  getStaffByID(id) {
    return createAPI.get(`/nhanvien/${id}`);
  },

  createStaff(Data) {
    return createAPI.post("/nhanvien", Data);
  },

  updateStaff(id, updateData) {
    return createAPI.put(`/nhanvien/${id}`, updateData);
  },

  deleteStaff(id) {
    return createAPI.delete(`/nhanvien/${id}`);
  },
};
