const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

// middleware
app.use(cors());
app.use(express.json());

app.get('/delivery/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Delivery Service',
        timestamp: new Date().toISOString()
    });
});

// запуск сервера
app.listen(PORT, () => {
    console.log(`Delivery service running on port ${PORT}`);
});
