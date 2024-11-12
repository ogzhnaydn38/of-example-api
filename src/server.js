const db = require('./models');

const start = (app) => {
    // Veritabanına bağlan ve sunucuyu başlat
    db.sequelize.sync().then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
};

module.exports = { start };
