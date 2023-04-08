Camera Network API

This is a Node.js/Express/Mongoose RESTful API that allows you to perform CRUD operations on cameras and camera networks.

.Technologies Used
.Node.js
.Express
.Mongoose


The server should now be running on http://localhost:8080.

API Endpoints
Cameras
GET /cameras
Returns a list of all cameras.


GET /cameras/:id
Returns a single camera with the specified ID.



POST /cameras
Creates a new camera.



PUT /cameras/:id
Updates an existing camera with the specified ID.



DELETE /cameras/:id
Deletes the camera with the specified ID.



Camera Networks
GET /networks
Returns a list of all camera networks.