const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")


pathToPublic=path.join(__dirname,'../public')
pathToViews=path.join(__dirname,'../templates/views')
pathToPartials=path.join(__dirname,'../templates/partials')
app.use(express.static(pathToPublic))
app.set('view engine','hbs')
app.set('views',pathToViews)
hbs.registerPartials(pathToPartials)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Atul'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'this is help text',
        name:'Atul'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'this is about text',
        name:'Atul'
    });
})

// app.get('',(req,res)=>{
//     res.send("Hello Express");
// })

// app.get('/help',(req,res)=>{
//     res.send("I am Help")
// })
app.get('/help',(req,res)=>{
    res.send([{
        'name':'Atul',
        'age':29
    },{
        'name':'Vandana',
        'age':29
    }])
})

app.get('/about',(req,res)=>{
    res.send("<h1>About</h1>")
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please enter serach string"
        })
    }
    console.log(req.query.search);
   res.send({
    product:[]
   })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Must provide address....!!!"
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecastData,
                address:req.query.address
            })

        })
    })


    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg:"help Page not found"
    })
})




app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg:"Page not found"
    })
})


app.listen(process.env.PORT ,()=>{
    console.log("server started")
})
