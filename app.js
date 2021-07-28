const express=require("express");
const app=express();
const cors=require('cors');
const Bookdata=require("./src/model/Bookdata")
const Authordata=require("./src/model/Authordata")
const jwt=require("jsonwebtoken")
uname="admin@gmail.com"
pswd="admin123"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

function verifyToken(req,res,next)
{
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  console.log(payload)
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}


app.post('/login',(req,res)=>{
  let udata=req.body
  if(uname!=udata.uname)
  {
    res.status(401).send("Invalid Username")
  }
  else if(pswd!=udata.pswd)
  {
    res.status(401).send("Invalid Password")

  }
  else
  {
    let payload={subject:uname+pswd}
    let token=jwt.sign(payload,'secretKey')
    res.status(200).send({token})
  }
})


app.get('/books',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
      Bookdata.find()
      .then(function(books){
            res.send(books);           
        })    
      });

      app.get('/authors',function(req,res){
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
          Authordata.find()
          .then(function(authors){
                res.send(authors);           
            })    
          });


      app.get('/:id',  (req, res) => {
  
        const id = req.params.id;
        Bookdata.findOne({"_id":id})
          .then((book)=>{
              res.send(book);
          });
      })

      app.post('/addbook',function(req,res){
        res.header('Access-Control-Allow-Origin','*');
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
        console.log(req.body);             
        var book={
            title:req.body.book.title,
            author:req.body.book.author,
            genre:req.body.book.genre,
            image:req.body.book.image
        }
        var book=new Bookdata(book);

        book.save();
    
    });

    app.get('/author/:id',  (req, res) => {
  
      const id = req.params.id;
      Authordata.findOne({"_id":id})
        .then((author)=>{
            res.send(author);
        });
    })

    app.post('/addauthor',function(req,res){
      res.header('Access-Control-Allow-Origin','*');
      res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
      console.log(req.body);      
     
      var author={
          name:req.body.author.name,
          about:req.body.author.about,         
          image:req.body.author.image
      }
      var author=new Authordata(author);

      author.save();
  
  });

    app.post('/updatebook',(req,res)=>{
      console.log(req.body)
      id=req.body._id
      
      Bookdata.findByIdAndUpdate({"_id":id},
      {$set:{"title":req.body.title,
      "author":req.body.author,
      "genre":req.body.genre,
      "image":req.body.image,
      }})
      .then(function(){
        res.send();

});
      
        


});
                                  

  app.get('/removebook/:id',(req,res)=>{
   
    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
           res.send();
  })
      })

  app.get('/removeauthor/:id',(req,res)=>{
   
    id = req.params.id;
    Authordata.findByIdAndDelete({"_id":id})
    .then(()=>{
      res.send();
  })
    
  })
  app.post('/updateauthor',(req,res)=>{
    console.log(req.body)
    id=req.body._id
    
    Authordata.findByIdAndUpdate({"_id":id},
                                  {$set:{"name":req.body.name,
                                  "about":req.body.about,                                 
                                  "image":req.body.image,
                                  }})
                                  .then(function(){
                                    res.send();
                            
                            });
});
  

      app.listen(8000,function(){
        console.log("Listening to Port 8000")
    })