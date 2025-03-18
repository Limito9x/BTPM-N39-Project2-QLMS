const { ObjectId } = require("mongodb");

class nhanVienService {
  constructor(client) {
    this.NhanVien = client.db().collection("nhanvien"); // Đổi collection thành "readers"
  }

  extractNhanVienData(payload) {
    const nhanvien = {
      msnv: payload.msnv, // lấy id tự động
      hotenNV: payload.hotenNV,
      password: payload.password,
      chucvu: payload.chucvu,
      diachi: payload.diachi,
      dienthoai: payload.dienthoai,
    };

    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );
    return nhanvien;
  }

  //tạo nhân viên mới
  async create(payload) {
    const NhanVien = this.extractNhanVienData(payload);
    // Kiểm tra đã tồn tại chưa
    const existNhanVien = await this.NhanVien.findOne({
      msnv: NhanVien.msnv
    });

    if (existNhanVien) {
      throw new Error("Thông tin nhân viên đã tồn tại");
    }

    const result = await this.NhanVien.insertOne(NhanVien);
    return result;
  }

  async find(filter) {
    const cursor = await this.NhanVien.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      hotenNV: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.NhanVien.findOne({
      msnv: id
    });
  }

  async update(id, payload) {
    const filter = {
      msnv: id,
    };
    const data = this.extractNhanVienData(payload);
    const res = await this.NhanVien.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    return res;
  }

  async delete(id) {
    const result = await this.NhanVien.findOneAndDelete({
      msnv: id,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.NhanVien.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = nhanVienService;
