const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');
const metaRoutes = require("./routes/metaRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);
app.use("/api/meta", metaRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
