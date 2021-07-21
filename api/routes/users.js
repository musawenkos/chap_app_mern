const router = require('express').Router();
const Users = require('../model/Users');
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.post("/",async (req,res)=>{
    const newUser = {
        _id: req.body._id,
        password: getHashedPassword(req.body.password),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        img_src: req.body.img_src,
    }
    const newUsers = new Users(newUser);
    try{
        const saveUser =  await newUsers.save();
        res.status(200).json({sent:true});
    }
    catch(err){
        res.status(500).json(err);
    }
});


router.get("/:id",async (req,res)=>{
    try{
        const user =  await Users.find({
            _id: req.params.id,
        });
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/:id/login",async (req,res)=>{
    try{
        const user =  await Users.find({
            _id: req.params.id,
        });
        if(user !== null){
            let psw = getHashedPassword(req.body.password);
            if(user[0].password === psw){
                res.status(200).json({exist:true});
            }else{
                res.status(200).json({exist:false});
            }
        }else{
            res.status(200).json({exist:false});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;