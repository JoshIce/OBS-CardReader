# OBS-CardReader

Reads game cards and displays high-res image of the card in OBS. 
This helps tabletop streaming setups that lack a high-res camera to show text on cards and other resources.

## Requirements

* Windows (Probably)
* Webcam
* (preferably) High-res images of game cards.
* [Node.js 8.7.0](http://nodejs.org/)
* [Python 2.7.8+](https://www.python.org/)
* [Visual Studio Express 15](https://www.visualstudio.com/vs/older-downloads/)
* [OpenCV 2.4.13+](http://opencv.org/)

## Installation

* Open command prompt
* Git Clone the project
* Launch Visual Studio Express 15
* Go to New Project > C++ > Install Windows Universal Tools
* Set environment variable OPENCV_DIR to [OPENCV Folder]\build\x64\vc14
* Append ;%OPENCV_DIR%\bin to PATH environment variable
* Navigate to server directory in project
* Type 'npm install --global --production windows-build-tools'
* Type 'npm install'
* Add images to the [project root]\client\games\[game name] folder
* In [project root]\server\lib\routes\socket.js, change the game variable to the name of the game folder you are using.

## Setting up the card reader

* Either use the start.bat file, or open your preferred terminal in the server directory and run 'server.js'
* Open your browser and go to `localhost:8080`
* Go into OBS, select the scene you want your cards to appear in, right-click in the sources box, and add a Window Capture
* Select the OBS-CardReader window.
* From here you can apply a chroma key to make the background of the webpage invisible and crop the capture down to size.

## Troubleshooting
* If your cards are not reading, or are reading non-card images as similar, you can change the tolerance value in [project dir]\server\lib\routes\socket.js
