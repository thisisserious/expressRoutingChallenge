var express = require('express');
var router = express.Router(); //capitalize Router as a function b/c express defined it like that

var songs = [];

router.post('/', function (req, res) {
  console.log('req.body:', req.body);
  console.log('songs', songs);
  var dupe = false;
  var date = new Date();
  req.body.dateAdded = date.toDateString();
  songs.forEach(function (song) {
    if (req.body.title === song.title && req.body.artist === song.artist) {
      dupe = true;
    }
  });

  if (req.body.title === null || req.body.artist === null) {
    dupe = true;
  }

  if (req.body.title === '' || req.body.artist === '') {
    dupe = true;
  }

  if (dupe) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
    songs.push(req.body);
  }

});

router.get('/', function (req, res) {
  res.send(songs);
});

router.get('/favorite', function(req, res) {
  res.send({title:'People Are Strange', artist:'Echo and the Bunnymen'});
});

module.exports = router;
