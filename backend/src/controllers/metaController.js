const { getAllSales } = require("../utils/dataLoader");

async function getAllTags(req, res) {
  try {
    const sales = await getAllSales();
    const tagSet = new Set();

    sales.forEach((sale) => {
      if (Array.isArray(sale.tags)) {
        sale.tags.forEach(tag => tagSet.add(tag));
      }
    });

    res.json({
      tags: Array.from(tagSet).sort()
    });
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ message: "Failed to fetch tags" });
  }
}

module.exports = { getAllTags };
