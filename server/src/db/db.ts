import mongoose from 'mongoose'
import config from '../config/config'

export const connect = () => {
    mongoose.connect(config.MONGO_URL).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
}

export default connect;