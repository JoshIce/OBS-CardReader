//config.js
var camera = 0; //try incrementing this if it's not picking up the right camera
var game = "StarRealms"; //name of folder in ./client/games
var tolerance = 35; // adjust this if it is picking up noise
var camWidth = 640;
var camHeight = 480;
var camInterval = 1000; // how often the camera updates

exports.camera = camera;
exports.game = game;
exports.tolerance = tolerance;
exports.camWidth = camWidth;
exports.camHeight = camHeight;
exports.camInterval = camInterval;
