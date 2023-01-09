const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const Role = db.role;
require('dotenv').config();

verifyToken = async (req, res, next) =>{
    const token = req.headers.authorization.trim().split(" ")[1];
    const authHeader = req.headers.authorization;

    if(!authHeader){
       return  res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{

        if(err){
           return res.status(401).send({message: "Invalid token!"});
        }
        req.userId = decoded.id;
        next();
    });

};

isAdmin = async (req, res, next) =>{

    User.findById(req.userId).exec((err, user) =>{
        
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) =>{
                if(err){
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                      next();
                      return;
                    }
                }
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        )

    
    });
};

isModerator = async (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  };

  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
  };

  module.exports = authJwt;
