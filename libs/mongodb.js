import mongoose from "mongoose"

const ConnectMongodb = async() =>{
    try{
        if (mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.db_connection)
            console.log('db connected')
            .then(()=>console.log('connected'))
            .catch(e=>console.log(e));
        }
    }
    catch(error){
        console.log(error)
    }
}
export default ConnectMongodb