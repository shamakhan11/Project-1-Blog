const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const blogModel = require("../models/blogModel");

/////////////////////// -AUTHENTICATION- //////////////////////////////

const Authentication = async function (req, res, next) {
  // compare the logged in user's Id and the Id in request
  try {

    const token = req.headers["x-api-key"];
    if (!token) {
     return res.status(404).send({ status: false, msg: "token must be required in the header" });
    }

     jwt.verify(token, "functionUp",function(error,decodedToken){
      if (error){
        return  res.status(400).send({ status: false, msg: "invalid token" });
      }

      req.authorId = decodedToken.authorId
      next();
    });
      
     } catch (error) { res.status(500).send({ status: false, msg: error.massage })}};


//////////////////////// -AUTHORIZATION- ////////////////////////////////

const Authorization =  async function (req, res, next) {
  try {

/////////////////////// -TAKING AUTHORID FROM BODY- ///////////////

    const authorIdFromBody = req.body.authorId
    if(authorIdFromBody){
     if(!mongoose.Types.ObjectId.isValid(authorIdFromBody)){
       return res.status(400).send({status:false, msg:"enter a valid authorid in body"})
    }

    const loggedInAuthorId = req.authorId
     if(authorIdFromBody != loggedInAuthorId){
      return res.status(403).send({status:false, msg:"You are not authorize"})
    }else{
     return  next();
    }
  }



  
//////////////////////////// -TAKING BLOGID FROM PATH- ///////////////////////////

  const blogIdFromPath =  req.params.blogId

  if(blogIdFromPath){
    if(!mongoose.Types.ObjectId.isValid(blogIdFromPath)){
      return res.status(400).send({status:false, msg:"enter a valid blogid in path"})
    }

    const availableBlog = await blogModel.findById(blogIdFromPath)
    if(!availableBlog){
      return res.status(404).send({status:false,msg:"Blog id not found"})
    }

     const authorIdFromAvailableBlog = availableBlog.authorId
     const loggedInAuthorId = req.authorId

     if(authorIdFromAvailableBlog != loggedInAuthorId){
      return res.status(403).send({status:false, msg:"You are not authorize"})
    }else{
     return next();
    }

  }
   
  return res.status(400).send({status:false, msg:"authorId or blogId id required "})
  
    
  } catch (error) { res.status(500).send({ status: false, error: error.message })}};




module.exports = {Authentication,Authorization };

