const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

class Database {
  static instance = null;
  isConnected = false;

  constructor() {}

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connectDB() {
    if (this.isConnected) {
      return;
    }

    try {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });

      await mongoose.connect(connectionString, {
        maxPoolSize: 50, // Tối 50 connections và có thể tái sử dụng connect. Default: 100
      });
      this.isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.log(error);
      process.exit(1); //Thoát ngay quá trình chạy nodejs khi kết nối thất bại
    }
  }
}

module.exports = Database.getInstance();
