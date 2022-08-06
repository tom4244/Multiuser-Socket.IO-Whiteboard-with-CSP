# Multiuser Socket.IO Whiteboard with CSP 

Use a real-time online collaborative whiteboard in browsers on desktop, tablet, or smartphone.

* Select from text, free drawing, and filled or unfilled geometric shapes.

* Choose from 16 million colors and a wide variety of sizes for all items.

* Undo and Redo for anything added.

* All users can make changes and see other's changes in real time.

* Content Security Policy protects from inline script and style hacks. 

* State is conveniently managed with Jotai Atoms.

This project uses React, Javascript, NodeJS, Jotai Atoms, Express, Nginx, Socket.IO, Canvas, Webpack, Flexbox, and SCSS.

![whiteboard.jpg](https://github.com/tom4244/Multiuser-Socket.IO-Whiteboard-with-CSP/blob/main/src/app/img/whiteboard.png\?raw\=true)

# Installation
* The project is configured to use an Express server for both http and socket.io with an Nginx server as a reverse proxy. The Express server is configured in the server/index.js file. An example nginx.conf file for Nginx server configuration with the needed "proxy pass" set up is included. 
* Select the port to be used for the socket.io server (such as 3000) and put it in config.js.
* The project is configured by default for localhost http to enable a quick setup for local experimentation, but with comments provided for necessary changes when using on an https site. Certificate paths should be included in server/config.js.
* Install nodeJS.
* Run "npm install" to install all needed nodejs packages and dependencies.
* Start the Nginx reverse proxy server if used.
* Run "npm start" to start the Express server.
* As provided, the whiteboard can first be tried on http://localhost; when hosted on an internet server (comments in the code include instructions for switching to an https site), it can be used on any platform (desktop, tablet, or smartphone) in browsers.

