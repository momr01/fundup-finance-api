const mongoose = require("mongoose");

 const MONGODB_URI =
   "mongodb+srv://momr01:Heartstopper01@cluster0.koly3.mongodb.net/FundupFinance?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectDB };
