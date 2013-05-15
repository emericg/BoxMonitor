/*---------------------
	:: Static 
	-> controller
---------------------*/

var wc = require('child_process').spawn('wc', ['-l', '/proc/swaps']);
var fs = require('fs');

var swap_string = new String('off');
var swap_nb = 0;

wc.stdout.on('data', function (data) {
  swap_nb = String(data).split(" ")[0] - 1;
  console.log('wc stdout: ' + swap_nb + ' swap partition(s) found.');
});

var StaticController = {

  // To trigger this action locally, visit: `http://localhost:port/static/index`
  index: function (req,res)
  {
    //
  },

  // To trigger this action locally, visit: `http://localhost:port/static/swap`
  swap: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{"swap": swap_string}];

    // note: do not forget multiple swap files
    if( swap_nb > 0 )
    {
      jsonObj.push([{
        "path": "swap",
        "total": 0,
        "used": 0,
        "free": 0
      }]);
    }

    // Send a JSON response
    res.json(jsonObj);
  },

};
module.exports = StaticController;