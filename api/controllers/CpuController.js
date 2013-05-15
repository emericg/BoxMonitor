/*---------------------
    :: Cpu 
    -> controller
---------------------*/

var os = require('os');

var prev_total = new Array();
var prev_total_use = new Array();

for(var i = 0, len = os.cpus().length; i < len; i++) {
  prev_total[i] = 0;
  prev_total_use[i] = 0;
}

var CpuController = {

  // To trigger this action locally, visit: `http://localhost:port/cpu/index`
  index: function (req,res)
  {
    //
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/load_avg`
  load_avg: function (req,res)
  {
    var tc = new Date();

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{"timecode": tc.getUTCSeconds()}, {
      "1": os.loadavg()[0].toFixed(3),
      "5": os.loadavg()[1].toFixed(3),
      "15": os.loadavg()[2].toFixed(3)
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/usage`
  usage: function (req,res)
  {
    var tc = new Date();

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc.getUTCSeconds(),
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

  // To trigger this action locally, visit: `http://localhost:port/cpu/usage_avg`
  usage_avg: function (req,res) {
    var tc = new Date();
    var percent = 0;

    // Get the value of a parameter
    //var param = req.param('message');

    for(var i = 0, len = os.cpus().length; i < len; i++) {
      var cpu = os.cpus()[i], total = 0, total_use = 0, idle = 0;

      for(type in cpu.times) {
        total += cpu.times[type];
        if(type != 'idle')
          total_use += cpu.times[type];
      }

      var delta_total = total - prev_total[i];
      var delta_use = total_use - prev_total_use[i];
      percent += ((delta_use / delta_total) * 100);

      //log += "CPU "+i+": "+percent+"%<br />";
      //log += 'user: '+cpu.times.user+'|nice: '+cpu.times.nice+'|sys: '+cpu.times.sys+'|idle: '+cpu.times.idle+'|irq: '+cpu.times.irq+'<br />';

      prev_total[i] = total;
      prev_total_use[i] = total_use;
    }

    percent /= os.cpus().length;

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc.getUTCSeconds(),
      "usage": percent.toFixed(2)
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/freq`
  freq: function (req,res) {
    var tc = new Date();
    var freqs = 0;

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc.getUTCSeconds(),
      "cores": os.cpus().length,
    }]

    // Get the core frequencies
    for(var i = 0; i < os.cpus().length; i++)
    {
      jsonObj.push([{
        "id": i,
        "freq": os.cpus()[i].speed,
      }]);
    }

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/freq_avg`
  freq_avg: function (req,res) {
    var tc = new Date();
    var freqs = 0;

    // Get the value of a parameter
    //var param = req.param('message');

    for(var i = 0, len = os.cpus().length; i < len; i++) {
      freqs += os.cpus()[i].speed;
    }

    // Create a json containing the infos
    var jsonObj = [{
      "timecode": tc.getUTCSeconds(),
      "freq_avg": (freqs / os.cpus().length).toFixed()
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

};
module.exports = CpuController;
