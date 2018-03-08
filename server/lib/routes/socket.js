var cv = require('opencv');
var fs = require('fs');
var PriorityQueue = require('priorityqueuejs')

// camera properties
var camWidth = 320;
var camHeight = 240;
var camFps = 2; //2
var camInterval = 4000;

// detection properties
var game = "RftG";
var tolerance = 35; //0-100

// initialize camera
var camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

// get list of files
var directory = '../client/' + game;
var images = [];
var curImage = "";
images = fs.readdirSync(directory);
images.forEach(function(image, i){
  images[i] = directory + image;
});

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

            if (dissimilarity < 45 && images[i] != curImage) {
              var filename = images[i].replace(directory, '');
              similarity = 100 - dissimilarity;
              cards.enq({ similarity: similarity, image: filename});
              // socket.emit('image', { image: filename})
              curImage = images[i];
            };
          });
        });
      });
      if (cards.size() > 0){
        var curCard = cards.deq();
        console.log(curCard.image + " is the most similar at " + curCard.similarity + "%");
        socket.emit('image', { image: curCard.image});
        cards.forEach(function (){
          cards.deq();
        })
      };
      // socket.emit('frame', { buffer: im.toBuffer() });
    });
  }, camInterval);
};
