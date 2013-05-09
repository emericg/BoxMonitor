/*---------------------
    :: Cpu 
    -> controller
---------------------*/

var tc = 0;
var os = require('os');

var CpuController = {

  // To trigger this action locally, visit: `http://localhost:port/cpu/index`
  index: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc++,
      "cores": os.cpus().length,
    }]

    for(var i = 0; i < os.cpus().length; i++)
    {
      jsonObj.push([{
        "id": i,
        "user": (os.cpus()[i].times.user + os.cpus()[i].times.sys) / 1000000,
      }]);
    }

    // Send a JSON response
    res.json(jsonObj);
  },

  load: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc},{
      "1": os.loadavg()[0].toFixed(3),
      "5": os.loadavg()[1].toFixed(3),
      "15": os.loadavg()[2].toFixed(3)
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  percent: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    var usage = 0;

    for(var i = 0; i < os.cpus().length; i++)
    {
      usage += (os.cpus()[i].times.user + os.cpus()[i].times.sys) / 1000000;
    }

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc,
      "usage": (usage / os.cpus().length).toFixed(1)
    }]

    // Send a JSON response
    res.json(jsonObj);  
  },

};
module.exports = CpuController;
