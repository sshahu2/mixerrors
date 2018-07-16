const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    position:"default"
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            position:user.position,
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});
//getAllUser
router.get('/usersList', function(req, res) {
  User.find(function(err, items,next) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                else
                {
               // console.log(items);
                res.json(items);
                }

                
                });
  
});
router.delete('/:username',function(req, res) {
  
  User.remove({
    username: req.params.username
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});
router.put('/:username', function(req, res) {
  var updatedUser = {};
  updatedUser.name = req.body.name;
  updatedUser.email = req.body.email;
  updatedUser.username = req.body.name;
  updatedUser.position = req.body.position;
  
  /*BookApi.updateBookById(req.params.id, updatedBook, function(err) {
		//	res.redirect('/book');
    res.json(updatedBook);
  });*/
  User.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, function(err, updatedUser) {
    if (err)
      res.send(err);
    res.json(updatedUser);
  });

});
router.get('/:username', function(req, res) {
  /*BookApi.getBookById(req.params.id, function(err, book) {
    //res.render('book/edit', {book: book});
    res.json(book);
  });*/
  User.findOne({username:req.params.username},function(err, user) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                else
                //console.log(books);
                res.json(user);

                /*db.close(function(){
        console.log("close");
                });*/
                
    });

});

  

module.exports = router;
