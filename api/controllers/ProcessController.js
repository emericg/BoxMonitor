/*---------------------
    :: Process 
    -> controller
---------------------*/

var os = require('os');
var fs = require('fs');

var ProcessController = {

  // To trigger this action locally, visit: `http://localhost:port/process/index`
  index: function (req,res)
  {
    //
  },

  running: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var loadavg_data = fs.readFileSync("/proc/loadavg", "utf8");
    loadavg_data = loadavg_data.split(' ');

    var running = loadavg_data[3].split('/')[0];
    var total = loadavg_data[3].split('/')[1];

    var jsonObj = [{
      "timestamp": timestamp_ms,
      "running": parseInt(running),
      "total": parseInt(total)
    }]

    // Send a JSON response
    console.log( JSON.stringify(jsonObj) );
    res.json(jsonObj);
  },

};
module.exports = ProcessController;