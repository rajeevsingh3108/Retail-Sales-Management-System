const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let salesCache = null;

function loadSalesData() {
  return new Promise((resolve, reject) => {
    if (salesCache) {
      return resolve(salesCache);
    }

    const results = [];
    const filePath = path.join(__dirname, '..', 'data', 'sales_data.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const sale = {
            transactionId: row['Transaction ID'],
            customerId: row['Customer ID'],
            customerName: row['Customer Name'],
            phoneNumber: row['Phone Number'],
            gender: row['Gender'],
            age: row['Age'] ? Number(row['Age']) : null,
            customerRegion: row['Customer Region'],
            productId: row['Product ID'],
            productName: row['Product Name'],
            brand: row['Brand'],
            productCategory: row['Product Category'],
            tags: row['Tags']
  ? row['Tags']
      .toString()
      .split(',')
      .map(t => t.trim().toLowerCase())
  : [],

            quantity: row['Quantity'] ? Number(row['Quantity']) : 0,
            pricePerUnit: row['Price Per Unit']
              ? Number(row['Price Per Unit'])
              : 0,
            discountPercentage: row['Discount Percentage']
              ? Number(row['Discount Percentage'])
              : 0,
            totalAmount: row['Total Amount']
              ? Number(row['Total Amount'])
              : 0,
            finalAmount: row['Final Amount']
              ? Number(row['Final Amount'])
              : 0,
            date: row['Date'] ? new Date(row['Date']) : null,
            paymentMethod: row['Payment Method'],
            orderStatus: row['Order Status'],
            deliveryType: row['Delivery Type'],
            storeId: row['Store ID'],
            storeLocation: row['Store Location'],
            salespersonId: row['Salesperson ID'],
            employeeName: row['Employee Name'],
          };

          results.push(sale);
        } catch (e) {
          console.error('Error parsing row:', e);
        }
      })
      .on('end', () => {
        salesCache = results;
        console.log(`Loaded ${salesCache.length} sales records`);
        resolve(salesCache);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function getAllSales() {
  if (!salesCache) {
    await loadSalesData();
  }
  return salesCache;
}

module.exports = {
  getAllSales,
};
