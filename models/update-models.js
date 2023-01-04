const mongoose=require('mongoose');
const db = require('../database');

const userSchema = new mongoose.Schema({
            event: String,
        });
userTable=mongoose.model('users',userSchema);
        
module.exports={
     editData:function(editId,callback){
        const userData= userTable.findById(editId);
        userData.exec(function(err, data){
         if(err) throw err;
         return callback(data);
      })
     },
     updateData:function(inputData, editId, callback){
                  
      userData= userTable.findByIdAndUpdate(editId, inputData);
      userData.exec(function(err, data){
        if (err) throw err;
         return callback(data);
      })
   }
}