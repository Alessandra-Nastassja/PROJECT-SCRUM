const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Cloud: Mlab
// const uri = "mongodb://anastassja:anastassja123@ds027748.mlab.com:27748/node-mongo-crud-api";
// mongoose.connect(uri,{
//     useMongoClient:true,
// });

//Local: Mongodb
mongoose.connect('mongodb://localhost:27017/scrum', {
    useMongoClient:true
});

mongoose.connection.on('connected', () => {
	console.log('Conectado ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
	console.log('Erro na conexão: ' + err);
});

mongoose.connection.on('disconnect', () => {
	console.log('Desconectado :(');
});