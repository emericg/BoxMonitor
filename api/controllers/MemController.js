/*---------------------
    :: Mem 
    -> controller
---------------------*/

var os = require('os');
var fs = require('fs');
var wc = require('child_process').spawn('wc', ['-l', '/proc/swaps']);

var swap_string = new String('off');
var swap_nb = 0;

wc.stdout.on('data', function (data) {
  swap_nb = String(data).split(" ")[0] - 1;
  
  if( swap_nb > 0 )
    swap_string = 'on';

  //console.log('wc stdout: ' + swap_nb + ' swap partition(s) found.');
});

var MemController = {

  // To trigger this action locally, visit: `http://localhost:port/mem/index`
  index: function (req,res)
  {
    //
  },

  // To trigger this action locally, visit: `http://localhost:port/mem/mem_stats`
  mem_stats: function (req,res)
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

  // To trigger this action locally, visit: `http://localhost:port/mem/mem_usage`
  mem_usage: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    var percent = ((os.totalmem() - os.freemem()) / (os.totalmem())) * 100.0;

    // Send a JSON response
    res.send(percent.toFixed(1));
  },

  // To trigger this action locally, visit: `http://localhost:port/static/swap`
  swap_stats: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{"swap": swap_string}];

    // note: do not forget multiple swap files
    if( swap_nb > 0 ) {
      jsonObj.push([{
        "timecode": tc++,
        "total": 0,
        "used": 0,
        "free": 0,
        "path": "/swap",
      }]);
    }

    // Send a JSON response
    res.json(jsonObj);
  }

};
module.exports = MemController;
