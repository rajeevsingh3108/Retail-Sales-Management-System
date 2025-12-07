const {
  getSales,
  buildOptionsFromQuery,
} = require('../services/salesService');

async function handleGetSales(req, res) {
  try {
    const options = buildOptionsFromQuery(req.query);
    const result = await getSales(options);
    res.json(result);
  } catch (error) {
    console.error('Error in handleGetSales:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}

module.exports = {
  handleGetSales,
};
