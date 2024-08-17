const express = require('express');
const router = express.Router();
const db = require('../database/db');

const authenticateToken = require('../services/authentication');

router.post('/addNewArticle', authenticateToken, (req, res) => {
    let article = req.body;
    query = 'insert into article (title,content,published_date,categoryId,status) values (?,?,?,?,?)';
    db.query(query, [article.title, article.content,new Date(), article.categoryId,article.status], (err, result) => {
        if (!err) {
            return res.status(200).json({
                message: 'Article Successfully Added'
            });
        }
        else {
            return res.status(400).json(err);
        }
    });
});


router.get('/getAllArticle', authenticateToken, (req, res) => {


    query = " select a.id,a.title,a.content,a.status,a.published_date, c.id as categoryId,c.name as categoryName from article as a  inner join category as c where a.categoryId = c.id ";
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(err);
        }
    });
});

router.get('/getAllPublishedArticle', (req, res) => {
   
    query = " select a.id,a.title,a.content,a.status,a.published_date, c.id as categoryId,c.name as categoryName from article as a  inner join category as c where a.categoryId = c.id and a.status = 'published' ";
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(err);
        }
    });
});


router.post('/updateArticle', authenticateToken, (req, res) => {
    const article = req.body;
     
     query = " update article set title = ? , content=? ,published_date=? ,categoryId=?,status=? where id = ? ";
    db.query(query, [article.title, article.content,new Date(), article.categoryId,article.status ,article.id], (err, result) => {
        if (!err) {

             if(result.affectedRows== 0) {
                return res.status(404).json({
                    message: 'Article ID does not found'
                });
            }
            else{
                return res.status(200).json({
                    message: 'Article updated Successfully'
                });
            }
        }
        else { 
            return res.status(500).json( err);
        }
    });
});

router.get('/deleteArticle/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    query = " delete from article where id = ? ";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if(result.affectedRows== 0) {
                return res.status(404).json({
                    message: 'Article ID does not found'
                });
            }
            else{
                return res.status(200).json({
                    message: 'Article deleted Successfully'
                });
            }
        }
        else { 
            return res.status(500).json( err);
        }
    });
});

module.exports = router;