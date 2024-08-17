const express = require('express');

const router = express.Router();

const db = require('../database/db');

const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateToken = require('../services/authentication');

router.post('/addNewUser', authenticateToken, (req, res) => {
    let user = req.body;
   var query = 'select email,password,status from users where email = ?';

    db.query(query, [user.email], (err, result) => {
       
        if (!err) {
            if (result.length <=0) {

                query = "insert into users (name,email,password,status,isDeletable) values (?,?,?,'false','true')"; 
                db.query(query, [user.name, user.email, user.password], (err, result) => {
                    if (!err) {
                        return res.status(200).json({
                            message: 'User Successfully Registered'
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: 'Error'
                        });
                    }
                });
            }
            else {
                return res.status(400).json({
                    message: 'User already exists'
                });
            
           }
        }
        else {
            return res.status(400).json({
                message: 'Error'
            });
        }
    });

});


router.post('/login', (req, res) => {
    const user = req.body;
     query = 'select email,password,status from users where email = ?';

    db.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(400).json({
                    message: 'Invalid email or password'
                });
            }
            else if (result[0].status == 'false') {
                return res.status(401).json({
                    message: 'Wait for admin approval'
                });
            }
            else if (result[0].password == user.password) {
                const response = { email: result[0].email, isDeletable : result[0].isDeletable };
                try {
                    const token = jwt.sign(response, process.env.ACCESS_TOKEN , { expiresIn: '1h' });
                     res.status(200).json({
                        token: token
                    });
                } catch (error) {
                    return res.status(500).json({ message: 'Error generating token' });
                }

            }
            else {
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }


        } 
        else {
            return res.status(500).json({
                message: 'Error'
            });
        }
    
});
});


router.get('/getAllUsers', authenticateToken, (req, res) => {

    const tokenPayLoads = req.locals;

    var query;
    if (tokenPayLoads.isDeletable == 'false') {
        query = "select id, name,email , status from users where isDeletable = 'true'";
    }
    else {
        query = 'select id, name,email,status from users where isDeletable = "true" and email != ?';
    }

    db.query(query, [tokenPayLoads.email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json({
                message: 'Error'
            });
        }
    });


}
);



router.post('/updateUserStatus', authenticateToken, (req, res) => {
    const user = req.body;
     
    var query = " update users set status = ? where id = ?  and isDeletable = 'true' ";
    db.query(query, [user.status, user.id], (err, result) => {
        if (!err) {

             if(result.affectedRows== 0) {
                return res.status(404).json({
                    message: 'User ID does not exist'
                });
            }
            else{
                return res.status(200).json({
                    message: 'User status updated successfully'
                });
            }
        }
        else { 
            return res.status(500).json({
                message: 'Error'
            });
        }
    });
});

router.post('/updateUser', authenticateToken, (req, res) => {
    const user = req.body;
     
    var query = " update users set name = ? , email =? where id = ?";
    db.query(query, [user.name, user.email , user.id], (err, result) => {
        if (!err) {

             if(result.affectedRows== 0) {
                return res.status(404).json({
                    message: 'User ID does not exist'
                });
            }
            else{
                return res.status(200).json({
                    message: 'User status updated successfully'
                });
            }
        }
        else { 
            return res.status(500).json({
                message: 'Error'
            });
        }
    });
});


router.get('/checkToken', authenticateToken,(req , res)=>{
      return res.status(200).json({
          message : 'Token is valid'
      });
})






module.exports = router;