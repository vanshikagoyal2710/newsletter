//jshint esversion:6




const  express=require("express");
const request=require("request");
const app=express();
const bodyparser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){

const firstname=req.body.fname;
const lastname=req.body.lname;
const email=req.body.emailadd;

const data={
  members:[
    {
    email_address:email,

    status:"subscribed",
    merge_fields:{
      FNAME:firstname,
      LNAME:lastname
    }
  }
]
};
const jsondata=JSON.stringify(data);
const url="https://us1.api.mailchimp.com/3.0/lists/07be3d4a6e";
const options={
  method:"POST",
  auth:"vanshika:ea25dc45c0425d0ebf45859d362d4798-us1"
}
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server is running on port 3000");
});
// audience id
//07be3d4a6e
// curl -X POST \
//   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
//   --user "anystring:${apikey}"' \
//   -d '{"members":[],"update_existing":false}'

//api key ea25dc45c0425d0ebf45859d362d4798-us1
