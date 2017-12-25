const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear();
});
var app = express();

app.use(express.static(__dirname+'/public'));
app.use((req,resp,next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+"\n",(error)=>{
    if(error) {
      console.log('error while writing to file:'+error);
    }
  });
  next();
})
app.use((req,resp,next)=>{
  resp.render("maint.hbs",{
    pageTitle:'Maintenance Page'
  });
})

app.set('view engine','hbs');


app.listen(3000,()=> {
  console.log('Listening on port 3000');
});

app.get("/",(req,resp) => {
  resp.send("Hi");
});

app.get("/help",(req,resp) => {
  resp.send("help.html");
});

app.get('/about',(req,resp)=> {
  resp.render('about.hbs',{
    pageTitle:'About Me'
  });
});
