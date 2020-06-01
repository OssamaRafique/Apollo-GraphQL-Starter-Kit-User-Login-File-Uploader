const mongoose = require('mongoose');

module.exports.connection = async ()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify:false
        });
        console.info(`🗄️ Database Connected successfully \n Connection String: ${process.env.MongoDB_URL}`);
    } catch(error){
        console.error(error);
        throw error;
    }
}