const jwt = require('jsonwebtoken');

const Auth = (req,res,next) => {
    try{
        const token = req.headers['x-auth-token'];
        if(!token){
            return res.status(400).json({
                message: 'missing Auth token'
            })
        }
        if(jwt.verify(token, 'siliconMERNCourse')){
            next();
        }else{
            return res.status(401).json({
                message: 'unauthorized'
            })
        }
    }catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}

module.exports = Auth

// const jwt = require('jsonwebtoken');


// const Auth = (req,res,next)=>{
//     //console.log(req.headers);
//     //console.log(req.body);
//     //console.log(req.headers['x-auth-token']);
//     try{
//         const token=req.headers['x-auth-token'];
//         if(!token){
//             return res.status(400).json({
//                 message:"Missing Auth DATA"
//             })
//         }
//         console.log(jwt.verify(token,'siliconMERNCourse'));
//         if(jwt.verify(token,'siliconMERNCourse')){
//             next();
//         }
//         else{
//             return res.status(401).json({
//                 message:'Unauthorised Request'
//             })
//         }
//     }catch(err){
//         res.status(500).json({
//             message:"Unauthorised",
//             //error:err.message
//         })
//     }

//     next()
// }

// module.exports = Auth;