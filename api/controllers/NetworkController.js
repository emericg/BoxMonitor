/*---------------------
    :: Network
    -> controller
---------------------*/

var os = require('os');

var NetworkController = {

  // To trigger this action locally, visit: `http://localhost:port/network/index`
  index: function (req,res) {
      //
  },

  interfaces: function (req,res) {
    // Send a JSON response
    res.json(os.networkInterfaces());
  },

};
module.exports = NetworkController;