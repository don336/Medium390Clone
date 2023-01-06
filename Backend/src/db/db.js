import mongoose from "mongoose";
const {DB_CONNECT} = process.env
function connect(){
    mongoose.connect(`${DB_CONNECT}`, {})
    .then(()=>{
        console.log('Connected to DataBase!!!')
    })
    .catch((error)=>{
        console.log({Err: error})
        process.exit(1)
    })
}

export default connect