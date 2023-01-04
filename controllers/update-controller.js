const updateModel= require('../models/update-model');
module.exports={
  
    editData:function(req, res){
      var editId= req.params.id;
      updateModel.editData(editId,function(data){
        res.render('user-form',{userData:data});
      })
    },
    updateData:function(req, res){
      var inputData= req.body;
      var editId= req.params.id;
      updateModel.updateData(inputData, editId,function(data){
         res.redirect('/user/data-list')
         console.log(data.affectedRows + " record was updated");
      });
    }
}