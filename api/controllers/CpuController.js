/*---------------------
    :: Cpu 
    -> controller
---------------------*/

var os = require('os');
var fs = require('fs');

///////////////////////////////////////////////////////////////////////////////

var prev_total = new Array();
var prev_total_use = new Array();

for(var i = 0, len = os.cpus().length; i < len; i++) {
  prev_total[i] = 0;
  prev_total_use[i] = 0;
}

///////////////////////////////////////////////////////////////////////////////

var CpuController = {

  // To trigger this action locally, visit: `http://localhost:port/cpu/index`
  index: function (req,res)
  {
    //
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/load_avg`
  load_avg: function (req,res)
  {
    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "one": os.loadavg()[0].toFixed(3),
      "five": os.loadavg()[1].toFixed(3),
      "fifteen": os.loadavg()[2].toFixed(3)
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/usage`
  usage: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timestamp": timestamp_ms,
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
  usage_avg: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);
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
      "timestamp": timestamp_ms,
      "usage": percent.toFixed(2)
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/freqs`
  freqs: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);
    var freqs = 0;

    // Get the value of a parameter
    //var param = req.param('message');

    // Create a json containing the infos
    var jsonObj = [{
      "timestamp": timestamp_ms,
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
  freq_avg: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);
    var freqs = 0;

    // Get the value of a parameter
    //var param = req.param('message');

    for(var i = 0, len = os.cpus().length; i < len; i++) {
      freqs += os.cpus()[i].speed;
    }

    // Create a json containing the infos
    var jsonObj = [{
      "timestamp": timestamp_ms,
      "freq_avg": (freqs / os.cpus().length).toFixed()
    }]

    // Send a JSON response
    res.json(jsonObj);
  },

  // To trigger this action locally, visit: `http://localhost:port/cpu/processes_running`
  processes_running: function (req,res)
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

  // To trigger this action locally, visit: `http://localhost:port/cpu/stats`
  stat: function (req,res)
  {
    // parse full /proc/stat !
  },

};
module.exports = CpuController;
