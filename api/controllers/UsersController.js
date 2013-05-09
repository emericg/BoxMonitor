/*---------------------
    :: Users 
    -> controller
---------------------*/

var tc = 0;
var os = require('os');

var UsersController = {

    // To trigger this action locally, visit: `http://localhost:port/users/index`
    index: function (req,res) {

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc++,
      "total": i,
      "usage": ((os.cpus()[i].times.user)/1000000),
      "free": ((os.cpus()[i].times.user)/1000000)
    }]

    // Send a JSON response
    res.json(jsonObj);
  }

};
module.exports = UsersController;