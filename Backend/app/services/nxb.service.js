const { ObjectId } = require("mongodb");

class NXBService {
  constructor(client) {
    this.nxb = client.db().collection("nxb");
  }

  extractNXBData(payload) {
    const nxb = {
      maNXB: payload.maNXB, // lấy id tự động
      tennxb: payload.tennxb,
      diachi: payload.diachi,
    };

    Object.keys(nxb).forEach(
      (key) => nxb[key] === undefined && delete nxb[key]
    );
    return nxb;
  }

  async create(payload) {
    const nxb = this.extractNXBData(payload);
    // Kiểm tra đã tồn tại chưa
    const existNXB = await this.nxb.findOne({
      maNXB: nxb.maNXB,
    });

    if (existNXB) {
      throw new Error("Nhà xuất bản đã tồn tại");
    }

    const result = await this.nxb.insertOne(nxb);
    return result;
  }

  async find(filter) {
    const cursor = await this.nxb.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      tennxb: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.nxb.findOne({
      maNXB: id
    });
  }

  async update(id, payload) {
    const filter = {
      maNXB: id
    };
    const data = this.extractNXBData(payload);
    const res = await this.nxb.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    return res;
  }

  async delete(id) {
    const result = await this.nxb.findOneAndDelete({
      maNXB: id,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.nxb.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NXBService;
