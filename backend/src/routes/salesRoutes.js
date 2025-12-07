// backend/src/routes/salesRoutes.js
const express = require('express');
const { handleGetSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/', handleGetSales);

module.exports = router;
