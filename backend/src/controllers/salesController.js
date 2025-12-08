import Sale from "../models/Sale.js";

export const getSales = async (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      category,
      tags,
      paymentMethod,   
      minAge,
      maxAge,
      startDate,
      endDate,
      sortBy = "date",
      sortOrder = "desc",
      page = 1,
    } = req.query;

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    let query = {};

   if (search) {
  const isNumber = !isNaN(search);

  if (isNumber) {
    query["Phone Number"] = {
      $gte: Number(search),
      $lte: Number(search.padEnd(10, "9"))
    };
  } else {
    query["Customer Name"] = { $regex: search, $options: "i" };
  }



    }

    if (region) query["Customer Region"] = { $in: region.split(",") };
    if (gender) query["Gender"] = { $in: gender.split(",") };
    if (category) query["Product Category"] = { $in: category.split(",") };

    if (paymentMethod)
      query["Payment Method"] = { $in: paymentMethod.split(",") };

    if (tags) {
      const tagList = tags.split(",").map(t => t.trim());
      query["Tags"] = { $regex: tagList.join("|"), $options: "i" };
    }

    if (minAge || maxAge) {
      query["Age"] = {};
      if (minAge) query["Age"].$gte = Number(minAge);
      if (maxAge) query["Age"].$lte = Number(maxAge);
    }

    if (startDate || endDate) {
      query["Date"] = {};
      if (startDate) query["Date"].$gte = new Date(startDate);
      if (endDate) query["Date"].$lte = new Date(endDate);
    }
    let sort = {};
    const order = sortOrder === "asc" ? 1 : -1;

    if (sortBy === "customerName") {
      sort["Customer Name"] = order;
    } else if (sortBy === "quantity") {
      sort["Quantity"] = order;
    } else {
      sort["Date"] = order;
    }

    const data = await Sale.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Sale.countDocuments(query);

    console.log("Records Found:", data.length);
    console.log("Sample:", data[0]);

    res.status(200).json({
      success: true,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data
    });
  } catch (err) {
    console.error("Sales API Crashed:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
