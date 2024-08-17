const express = require('express');
const router = express.Router();
const db = require('../database/db');

const authenticateToken = require('../services/authentication');

router.post('/addNewCategory',authenticateToken, (req, res , next) => {
    let category = req.body;
     query = 'insert into category (name) values (?)';
    db.query(query,[category.name], (err, result) => {
        if (!err) {
            return res.status(200).json({
               message: 'Category Successfully Added'
            });
        }
        else {
            return res.status(400).json({
                message: 'Error'
            });
        }
    });
}
);

router.get('/getAllCategories',authenticateToken, (req, res) => {
    query = 'select * from category order by name';
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json({
                message: 'Error'
            });
        }
    });
}
);


router.post('/updateCategory', authenticateToken, (req, res) => {
    const category = req.body;
     
     query = " update category set name = ? where id = ?";
    db.query(query, [category.name, category.id], (err, result) => {
        if (!err) {

             if(result.affectedRows== 0) {
                return res.status(404).json({
                    message: 'Category ID does not exist'
                });
            }
            else{
                return res.status(200).json({
                    message: 'Category updated Successfully'
                });
            }
        }
        else { 
            return res.status(500).json( err);
        }
    });
});



module.exports = router;
