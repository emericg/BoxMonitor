/*---------------------
    :: Mem 
    -> controller
---------------------*/

var os = require('os');

var MemController = {

  // To trigger this action locally, visit: `http://localhost:port/mem/index`
  index: function (req,res)
  {
    //
  },

  // To trigger this action locally, visit: `http://localhost:port/mem/mem_stats`
  stats: function (req,res)
  {
    var tc = new Date();

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc++,
      "total": (os.totalmem() / 1048576).toFixed(),
      "used": ((os.totalmem() - os.freemem()) / 1048576).toFixed(),
      "free": (os.freemem() / 1048576).toFixed()
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/mem/usage_percent`
  usage_percent: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    var percent = ((os.totalmem() - os.freemem()) / (os.totalmem())) * 100.0;

    // Send a JSON response
    res.send(percent.toFixed(1));
  }

};
module.exports = MemController;
