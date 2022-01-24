const mysql=require("mysql")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const cookieParser = require('cookie-parser')

const knex = require("knex")({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '123@Navgurukul',
      database : 'Blog'
    }
});

signup = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10).then((hash) => {
        knex("register").insert({
                name:user.name,
                email: user.email,
                password: hash
            })
            .then((result) => {
                res.send({ sucess: "signup sucessfully" })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
    })
}

get_signup=(req,res)=>{
    knex.from("register").select("*")
    .then((row) =>{
        res.send(row)
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })  
}

login = (req, res) => {
    const user = req.body;
    knex.from("register").select("*").where("email", user.email)
        .then((data) => {
            console.log(data)            
            if (data.length > 0) {
                for (d of data)
                    userPassword = d['password']
                const verified = bcrypt.compareSync(user.password, userPassword.toString());
                console.log(d)
                if (verified) {
                    jwt.sign({user_id:d.user_id }, "Key", (err, token) => {


                        if (token) {
                            console.log(token)
                            res.cookie('jwt',token)
                            res.send({
                                message: "you are signup succesfully",
                                Token: token

                            });                                                                                                                                                         
                        }
                    })  
                } else {
                    res.send("password is not correct")
                }
            } else {
                res.status(403).send("user doen't exists")
            }
        })
}
verifyToken=(req,res,next)=>{
    try{
        var token=req.cookies.jwt

        console.log(token)

        var decode=jwt.verify(token,'Key',(err,data)=>{
            console.log(err)
            console.log(data)
        })
        
    }catch(err){
        console.log(err)
        res.send({message:'invalid token'})
    }

}

post_data = (req, res) => {
    newdata = req.body
    knex("post_data").insert({
        user_id: req.userdata.user_id,
        title: newdata.title,
        text: newdata.text
    })
        .then((data) => {
            newdata.id = data[0]
            res.send(newdata);
        })
        .catch((err) => {
            if (err) {
                // console.log(err);
                res.status(400).send({ error: err })
            }
        })

}

get_posts=(req,res)=>{
    knex.from("post_data").select("*").where("post_id",req.params.post_id)
    .then((row) =>{
        res.send(row)
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })  
}

likedislike = (req, res) => {
    console.log(req.userdata.user_id)
    knex.from('post_data').select('title').where('post_id', req.body.post_id).then((info) => {
        if (info.length == 0) {
            res.status(403).send("post is not found")
        } else {
            // jwt.verify(req.token, 'secretkey', (err, authData) => {
            //     if (authData) {
            //         console.log(authData)
                    knex("likedislike").select("*").where({ user_id: req.userdata.user_id, post_id: req.body.post_id})
                        .then((result) => {
                            console.log(result);
                            if (result.length > 0) {
                                res.send('u have already liked/dislike post')
                            } else {
                                knex('likedislike').insert( {post_id: req.body.post_id, like: req.body.like, dislike: req.body.dislike, user_id: req.userdata.user_id})
                                    .then((result) => {
                                        res.send({ sucess: "added" })
                                    })
                                    .catch((err) => {
                                        if (err) throw err;
                                        res.status(403).send({ error: err });
                                    })
                            }
                        })
            //     } else {
            //         res.status(403).send("user is not authenticated")
            //     }
            // })
        }
    })
    
}

get_likedislike = (req, res) => {
    knex('post_data').innerJoin("likedislike","post_data.post_id","=","likedislike.post_id").select("post_data".user_id,"post_data.title","post_data.text","likedislike.like","likedislike.dislike")
        .then((rows) => {
            res.send(rows)
        }).catch((err) => {
            res.json({
                message:err
            })
        })   
}

module.exports={signup,get_signup,login,verifyToken,post_data,get_posts,likedislike,get_likedislike}



