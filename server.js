const express=require('express')
const mongoose=require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override');
const articleRouter= require('./routes/articles')
const app=express();

mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

app.set('view engine','ejs'); //our view engine is ejs, and when we tell this, our ejs view willl be converted tohtml
app.use(express.urlencoded({extended:false}))
app.use('/articles',articleRouter);
app.use(methodOverride('_method'));


app.get('/',async (req,res)=>{
    //this is an array with articles in it
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles: articles})  //knows it is in views folder bydefault
})

app.listen(5000);