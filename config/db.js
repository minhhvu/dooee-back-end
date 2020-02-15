const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://minh:Mrminhhai93@dooee-web-app-qxwcg.mongodb.net/dev-dooee?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log(`MongoDB connected : ${conn.connection.host}`);
}

module.exports = connectDB;