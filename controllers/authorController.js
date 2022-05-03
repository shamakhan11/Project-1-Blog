const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const validator = require('validator');

////////////////////////  -CREATING AUTHOR-   ////////////////////////


const createAuthor = async function (req, res) {
  try {

    let data = req.body;

    const email = data.email;
    if (!email){
      return res.status(400).send({status:false, msg:"email is required"})
    }
////////////////////- VALIDATOR- ////////////////////////////////////
   const validEmail = validator.isEmail(email)
   if (!validEmail){
     return res.status(400).send({status:false, msg:"email is not valid"})
   }

   const checkEmail = await authorModel.findOne({ email:email});
   if (checkEmail){
     return res.status(400).send({status:false, msg:"email is already used"})
   }

   const password = data.password;
   if (!password){
      return res.status(400).send({status:false, msg:"password is required"})
   }


    const fname = data.fname;
    if (!fname){
      return res.status(400).send({ status:false, msg: "first name required"})
    }

    const lname = data.lname;
    if (!lname){
      return res.status(400).send({status:false, msg:"last name required"})
    }

     const checkTitle = data.title
     if (!checkTitle){
      return res.status(400).send({status:false, msg:"Title required"})
    }

   if (checkTitle){
     if (checkTitle=="Mr" || checkTitle== "Mrs" || checkTitle=="Miss"){
       
       const authorCreated = await authorModel.create(data);
        return res.status(201).send({status:true, data: authorCreated,})
     }
     else
     {
       return res.status(400).send({status:false, msg:"enter valid title"})
     }
    }

  } catch (error) {res.status(500).send({ msg: error.message })}};


/////////////////////////////////// -AUTHOR LOGIN-  //////////////////////////////////////////////////////

const authorLogIn = async function (req, res) {
  
try{
  const email = req.body.email;
  const password = req.body.password;

  if (!password){
     return res.status(400).send({status:false, msg:"password is required"})
  }

  if (!email){
    return res.status(400).send({status:false, msg:"email is required"})
  }
///////////////////////// -VALIDATOR- ///////////////////////////////////////
 const validEmail = validator.isEmail(email)
 if (!validEmail){
   return res.status(400).send({status:false, msg:"email is not valid"})
 }

 const checkedAuthor = await authorModel.findOne({ email: email, password: password });
  if (!checkedAuthor) {
    return res.status(404).send({ status: false, msg: "email or password is not correct"});
  }
   else {
    const token = jwt.sign({ authorId: checkedAuthor._id.toString() },"functionUp");
    return res.status(201).send({ status: true, Token: token });
  }
}
catch (error) { res.status(500).send({ msg: error.message })}};

module.exports.authorLogIn = authorLogIn;
module.exports.createAuthor = createAuthor;
