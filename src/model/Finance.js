const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    minAmount: {
      type: String,
      required: true,
    },
    maxAmount: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    dataEntry: {
      type: String,
      default: new Date(),
    },
    country: {
      type: String,
      required: true,
    },
    currencyDesc: {
      type: String,
      required: true,
    },
    currencySymbol: {
      type: String,
      required: true,
    },
    market: [
      {
        type: String,
        required: true,
      },
    ],
    types: [
      {
        type: String,
        required: true,
      },
    ],
    costs: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
      get: getAmount,
    },
    profile: {
      type: String,
      required: true,
    },
    risk: {
      type: String,
      required: true,
    },
    profitability: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {},
    },
    toJSON: {
      transform: (doc, ret) => {
        //delete ret.dataEntry;
        // delete ret.__v;
        //delete ret.payment;
      },
    },
  }
);

function getAmount(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }

  return value;
}

const Finance = mongoose.model("Finance", financeSchema);
module.exports = { Finance, financeSchema };
