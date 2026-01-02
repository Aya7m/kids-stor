import mongoose from "mongoose"

export const dbConnection=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGODB_URI)
        if(connection){
            console.log('db successfully connection ..');
            
        }else{
            console.log("error in db connection");
            
        }
        
    } catch (error) {
        console.log(error);
        
        
    }
}