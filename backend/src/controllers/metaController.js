import Sale from "../models/Sale.js";

export const getAllTags = async (req, res) => {
  try {
    const sales = await Sale.find({}, { "Tags": 1, _id: 0 });

    const tagSet = new Set();

    sales.forEach((sale) => {
      if (sale.Tags && typeof sale.Tags === "string") {
        sale.Tags.split(",").forEach((tag) => {
          tagSet.add(tag.trim());
        });
      }
    });

    console.log("TAGS FOUND:", Array.from(tagSet));

    res.status(200).json({
      success: true,
      tags: Array.from(tagSet)
    });
  } catch (err) {
    console.error("Tag Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags"
    });
  }
};

