const { ObjectId } = require("mongodb");

class ReaderService {
  constructor(client) {
    this.Reader = client.db().collection("readers");
  }

  extractReaderData(payload) {
    const reader = {
      madocgia: payload.madocgia,
      holot: payload.holot,
      ten: payload.ten,
      ngaysinh: payload.ngaysinh,
      phai: payload.phai,
      diachi: payload.diachi,
      dienthoai: payload.dienthoai,
      pass: payload.pass,
      tendangnhap: payload.tendangnhap,
    };

    Object.keys(reader).forEach(
      (key) => reader[key] === undefined && delete reader[key]
    );
    return reader;
  }

  async create(payload) {
    const Reader = this.extractReaderData(payload);
    // Kiểm tra đã tồn tại chưa
    const existReader = await this.Reader.findOne({
      madocgia: Reader.madocgia,
    });

    if (existReader) {
      throw new Error("ds bản đã tồn tại");
    }

    const result = await this.Reader.insertOne(Reader);
    return result;
  }

  async find(filter) {
    const cursor = await this.Reader.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      ten: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findByIdUser(id) {
    return await this.Reader.find({ madocgia: id }).toArray();
  }

  async update(id, payload) {
    const filter = {
      madocgia: id,
    };
    const data = this.extractReaderData(payload);
    const res = await this.Reader.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    return res;
  }

  async delete(id) {
    const result = await this.Reader.findOneAndDelete({
      madocgia: id,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Reader.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ReaderService;
