const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((data) => {
            console.log(`Mongodb connected to: ${data.connection.host}`);
        }).catch(err => {
            console.log(err.message);
        })


    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db')
    })

    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected.')
    })

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    })
};



module.exports = connectDatabase;
