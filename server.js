const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

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


app.set('view engine','hbs');


app.listen(port,()=> {
  console.log(`Listening on port ${port}`);
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
