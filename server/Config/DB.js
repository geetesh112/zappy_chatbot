import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGO_URI;

if (!mongo_url) {
    console.error('MongoDB URI is not defined. Please check your .env file.');
    process.exit(1);
}

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error: ', err);
    });
