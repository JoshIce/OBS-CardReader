var cv = require('opencv');
var fs = require('fs');
var PriorityQueue = require('priorityqueuejs');
var config = require("../../../config.js");

// initialize camera
var camera = new cv.VideoCapture(config.camera);
camera.setWidth(config.camWidth);
camera.setHeight(config.camHeight);

// get list of files
var directory = '../client/games/' + config.game + "/";
var images = [];
images = fs.readdirSync(directory);
images.forEach(function(image, i){
  images[i] = directory + image;
});

// loop switches
var curImage = "";
var curImagePQ = "";

// initialize priority queue
var cards = new PriorityQueue(function(a, b){
  return a.similarity - b.similarity;
});

module.exports = function (socket) {
  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;

      images.forEach(function(image, i) {

        cv.readImage(image, function(err, card, image) {
          if (err) throw err;

          cv.ImageSimilarity(im, card, function (err, dissimilarity, image) {
            if (err) throw err;

            if (dissimilarity < config.tolerance && images[i] != curImage) {
              // var filename = images[i].replace(directory, '');
              similarity = 100 - dissimilarity;
              cards.enq({ similarity: similarity, image: images[i]});
              // socket.emit('image', { image: filename})
              curImage = images[i];
            };
          });
        });
      });
      if (cards.size() > 0){
        var curCard = cards.deq();
        if (curCard != curImagePQ){
          console.log(curCard.image + " is the most similar at " + curCard.similarity + "%");
          socket.emit('image', { image: curCard.image});
          curImagePQ = curCard;
        };
        cards.forEach(function (){
          cards.deq();
        })
      };
      // socket.emit('frame', { buffer: im.toBuffer() });
    });
  }, config.camInterval);
};
