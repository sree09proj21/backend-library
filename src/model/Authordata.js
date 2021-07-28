const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/libraryt",{ useNewUrlParser: true ,useUnifiedTopology: true});
const Schema=mongoose.Schema;
const AuthorSchema= new Schema({
name:String,
about:String,
image:String
});
var Authordata=mongoose.model('authordata',AuthorSchema);
module.exports=Authordata;