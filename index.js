// const express=require("express")

// const router=require("./router/router.js")
// // cookieParser = require('cookie-parser')

// const bodyParser=require("body-parser")
// const cookieParser = require("cookie-parser")

// const app=express()



// app.use(bodyParser.json())
// app.use(cookieParser())


// // app.use(router)
// app.use ("/blog",router)

// app.listen(4000,()=>console.log("listning to the portal"))

const express=require("express")
const router=require("./router/router.js")
const bodyParser=require("body-parser")
const cookieParser = require("cookie-parser")

const app=express()
app.use(bodyParser.json())
app.use(cookieParser())


// app.use(router)
app.use ("/blog",router)

app.listen(4000,()=>console.log("listning to the portal"))