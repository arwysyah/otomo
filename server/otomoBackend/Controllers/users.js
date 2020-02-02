const {register,getUserById,getUsers,deleteUser,updateUser,getUserbyEmail} = require ('../Models/users')
const {genSaltSync,hashSync,compareSync}= require('bcrypt')

const {sign} = require ('jsonwebtoken')
module.exports = {
    register : (req,res)=>{
       const body = req.body
       const salt = genSaltSync(10)
       body.password = hashSync(body.password,salt)
       register(body,(error,results)=>{
           if (error){
               console.log(error)
               return res.status(500).json({
                   success : 0,
                   message : "database connetion error"

               })
           }
           return res.status(200).json({
               success: 1,
               data : results
           })
       })
    },
    getUsers:(req,res)=>{
        getUsers((error,results)=>{
            if(error){
                console.log(error)
                return;
            }
        return res.json({
            success:1,
            data:results
        })
        })
    },
    login :(req,res)=>{
        const email = req.body.email
        getUserbyEmail(email,(error,results)=>{
            if(error){
               return console.log(error)
            }
            if(!results){
               return res.json({
                    succes: 0,
                    message:"Data Not Found, Please Register"
                })
            }
            console.log(results)
            const result = compareSync(req.body.password, results.password)
            console.log("req password dan hash",req.body.password, results.password)
            if (result){
                results.password = undefined;
                const jsontoken = sign({result:results},process.env.SECRET_KEY,{
                    expiresIn :'24h'
                });
                return res.json({
                    succes:1,
                    message:'login succesfully',
                    token : jsontoken
                })
            }else{
                return res.json({
                    success:0,
                    message:'invalid email or password'
                })
            }
        })
    }
}
