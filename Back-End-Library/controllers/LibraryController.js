const express = require('express');
const bodyParser = require('body-parser');
const Library = require('../models/Library');
const Author = require('../models/Author')
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

import errorMsgs from '../private.js'; // Do not modify this file or change anywhere it is referenced here
router.use(bodyParser.json());


//POST books to the data-base
router.post('/', function (req, res) {
  const { books } = req.body;
  for (let i = 0; i < books.length; i++) {
    Author.findOne({author: books[i].author}, (err, author) => {
      if(err) return res.status(500).send(err);
      Library.create({
        title: books[i].title, 
        author: author._id,
        numberOfPages: books[i].numPages,
        publishDate: books[i].pubDate,
        rating: books[i].rating,
        cover: books[i].cover,
        synopsis: books[i].synopsis,
      }, (err, book) => {
        if(err) return res.status(500).send(errorMsgs.postBad)
      });
    });
  }
});


// GET a random book from the database
router.get('/random', function(req, res){
  Library.aggregate([{ $sample: { size: 1 }}], (err, book) => {
    if (err) return res.status(500).send(errorMsgs.getRandomBad);
    return res.status(200).send(book[0])
  });
});

// GET a list of all distinct authors from the database
router.get('/showAllAuthors', function(req, res){
  Library.distinct('author' , (err, authors) => {
    if(err) return res.status(500).send(errorMsgs.getShowAllAuthorsBad);
    return res.status(200).send(authors)
  });
});


//Get all books or search by id + pagination 
router.get('/all/', function(req, res){
  var bookObj = {};
  if(req.query.title && req.query.author){
    bookObj.title = req.query.title;
    bookObj.author = req.query.author;
  } else if (!req.query.title && req.query.author){
    bookObj.author = req.query.author;
  } else if(req.query.title && !req.query.author){
    bookObj.title = req.query.title;
  }
  var myObj = {};
  var perPage = 10;
  var page = parseInt(req.query.page) || 1;

  Library.find( bookObj).skip((page - 1) * perPage).limit(perPage).populate('author').exec(function(err, book){
    if (err) return res.status(500).send(`There was a problem finding your comments`);
    Library.count().exec(function(err,count){
      myObj.book = book;
      myObj.count = count;
      if (err) return res.status(500).send(`There was a problem counting your comments`);
      res.status(200).send(myObj);
    });
  });
});



// Create a GET route that GETS A SPECIFIC SINGLE BOOK FROM YOUR DATABASE here.
router.get('/:id', function(req, res){
  Library.findById(req.params.id, (err,book) => {
    if (err) return res.status(500).send(errorMsgs.getByIdBad);
    return res.send(book);
  });
});

// Get all Books
router.get('/', function (req, res) {
  Library.find({}, (err, books) => {
    if (err) return res.status(500).send(errorMsgs.getAllBad);
    return res.status(200).send(books);
  });
});


// Create a DELETE route that DELETES A BOOK BY AUTHOR OR TITLE
router.delete('/deleteBy', function(req, res){
    if(req.query.title && !req.query.author){
      Library.remove({title: req.query.title}, (err, books) => {
        if(err) return res.status(500).send(errorMsgs.deleteByBad);
        return res.status(200).send({books:books.n});
      });
    } else if(!req.query.title && req.query.author){
      Library.remove({author: req.query.author}, (err, books) => {
        if(err) return res.status(500).send(errorMsgs.deleteByBad);
        return res.status(200).send({books:books.n});
      });
    } else {
      Library.remove({author: req.query.author, title: req.query.author}, (err, books) => {
        if(err) return res.status(500).send(errorMsgs.deleteByBad);
        return res.status(200).send({books:books.n});
    });
  }
});



// Create a DELETE route DELETES A SPECIFIC SINGLE BOOK FROM YOUR DATABASE here.
router.delete('/:id', function(req, res){
  Library.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) return res.status(500).send(errorMsgs.deleteByIdBad);
    return res.status(200).send(book.title+errorMsgs.deleteByIdGood);
  });
});


// Create a PUT route that UPDATES A SPECIFIC SINGLE BOOK IN THE DATABASE here.
router.put('/:id', function(req, res){
  console.log(req.body);
  Library.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
    if (err) return res.status(500).send(errorMsgs.putByIdBad);
    return res.status(200).send(book);
  });
});


//AUTHOR CREATE
router.post('/author/', function (req, res) {
  const { author } = req.body 
  Author.insertMany(author, (err, author) => {
    if(err) return res.status(500).send(errorMsgs.postBad)
    return res.status(200).send(author);
  });
});



// -----------------------------------------------
// This endpoint will only be used to empty out your db so that cypress can properly seed data
// PLEASE DO NOT TOUCH THIS ENDPOINT
router.delete('/removeAll',function(req,res){
  Library.deleteMany({},function(err,books){
    if(err){
      res.status(500).send(errorMsgs.deleteRemoveAllBad);
    }else{
      res.status(200).send(errorMsgs.deleteRemoveAll);
    };
  });
});
// PLEASE DO NOT TOUCH THIS ENDPOINT
// -----------------------------------------------

module.exports = router;
