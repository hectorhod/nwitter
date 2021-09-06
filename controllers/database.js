const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/data';

mongoose.connect(uri).then(() => {
    console.log("Conectado ao MongoDB");
})
    .catch(err => {
        console.log("Falha na conexão", err);
        process.exit();
    });

module.exports = mongoose;