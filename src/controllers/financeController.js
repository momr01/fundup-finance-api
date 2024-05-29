const { Finance } = require("../model/Finance");

//get All Finance
const getAllFinance = async (req, res) => {
  try {
    const finances = await Finance.aggregate([
        {
            $addFields: {
              costs: {
                $toString: "$costs",
              },
            },
          },
          {
            $unset: ["__v"],
          },
          
    ]);

    res.json({results: finances});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewFinance = async (req, res) => {
  try {
    //1. getting data from body
    const {
      name,
      description,
      minAmount,
      maxAmount,
      url,
      country,
      currencyDesc,
      currencySymbol,
      market,
      types,
      costs,
      profile,
      risk,
      profitability,
    } = req.body;

    if (
      !name ||
      !description ||
      !minAmount ||
      !maxAmount ||
      !url ||
      !country ||
      !currencyDesc ||
      !currencySymbol ||
      !market ||
      !types ||
      costs < 0 ||
      !profile ||
      !risk ||
      !profitability
    ) {
      return res
        .status(400)
        .json({ message: "Please check the required data." });
    }

    //2. checking if the finance option already exists
    const financeExists = await Finance.findOne({
      name: name,
    });
    if (financeExists) {
      return res
        .status(409)
        .json({ message: "The finance option already exists." });
    }

    //3. creating new finance
    let newFinance = new Finance({
      name,
      description,
      minAmount,
      maxAmount,
      url,
      country,
      currencyDesc,
      currencySymbol,
      market,
      types,
      costs,
      profile,
      risk,
      profitability,
    });

    newFinance = newFinance.save();

    res.status(201).json(newFinance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFinance,
  addNewFinance,
};
