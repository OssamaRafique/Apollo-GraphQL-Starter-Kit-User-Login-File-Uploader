const mongoose = require('mongoose');

module.exports.connection = async ()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify:false
        });
        console.log(`🗄️ Database Connected successfully \n Connection String: ${process.env.MongoDB_URL}`);
    } catch(error){
        console.log(error);
        throw error;
    }
}