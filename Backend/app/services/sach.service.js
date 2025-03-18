const { ObjectId } = require("mongodb");
const NXBService = require("./nxb.service");

class SachService {
  constructor(client) {
    this.book = client.db().collection("books");
    this.nxbService = new NXBService(client);
  }

  async extractBookData(payload) {

    // Kiểm tra xem maNXB có tồn tại không
    const nxb = await this.nxbService.findById(payload.maNXB);
    if (!nxb) {
      throw new Error(
        `Không tìm thấy Nhà Xuất Bản với maNXB: ${payload.maNXB}`
      );
    }

    const book = {
      masach: payload.masach,
      tensach: payload.tensach,
      dongia: payload.dongia,
      soquyen: payload.soquyen,
      namsanxuat: payload.namsanxuat,
      maNXB: payload.maNXB,
      nguongoc_tacgia: payload.nguongoc_tacgia,
    };

    // Xóa các trường undefined
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );

    return book;
  }

  async create(payload) {
    const book = await this.extractBookData(payload); // Đảm bảo maNXB hợp lệ
    const existBook = await this.book.findOne({ masach: book.masach });

    if (existBook) {
      throw new Error("Sách đã tồn tại");
    }

    const result = await this.book.insertOne(book);
    return result;
  }

  async find(filter) {
    const cursor = await this.book.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      tensach: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.book.findOne({
      masach:id
    });
  }

  async update(id, payload) {
    const filter = {
      masach: id
    };
    const data = await this.extractBookData(payload); 
    const res = await this.book.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );
    return res;
  }

  async delete(id) {
    const result = await this.book.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.book.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = SachService;
