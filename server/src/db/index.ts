import mongoose from 'mongoose'
import 'dotenv/config';

let uri: string;
if (process.env.ENV && process.env.ENV === 'local') {
    uri ='mongodb://localhost:27017/insta_clone';
} else {
    if(process.env.MONGO_URI) {
        uri = process.env.MONGO_URI ;
    }
}
async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Could not connect to MongoDB: ', error);
    }
}

export default connectToDb;