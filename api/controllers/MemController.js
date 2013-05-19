/*---------------------
    :: Mem 
    -> controller
---------------------*/

var os = require('os');
var fs = require('fs');

var MemController = {

  // To trigger this action locally, visit: `http://localhost:port/mem/index`
  index: function (req,res)
  {
    //
  },

  mem_stats: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo","timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');
    meminfo.forEach(function (item) {
      item = item.replace(/\s+/, ' ');
      item = item.replace(/\skB/, '');
      item = item.replace(/\:/, '');

      if (item !== '') {
        item = item.split(' ');

        if( String(item[0]) == "MemTotal" ||
            String(item[0]) == "MemFree" ||
            String(item[0]) == "Buffers" ||
            String(item[0]) == "Cached" ) {
          meminfo_json_content[String(item[0])] = parseInt(item[1]);
          //console.log( String(item[0]) + ": " + parseInt(item[1]) );
        }
      }
    });

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

  mem_stats_full: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo","timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');
    meminfo.forEach(function (item) {
      item = item.replace(/\s+/, ' ');
      item = item.replace(/\skB/, '');
      item = item.replace(/\:/, '');

      if (item !== '') {
        item = item.split(' ');
        meminfo_json_content[String(item[0])] = parseInt(item[1]);
        //console.log( String(item[0]) + ": " + parseInt(item[1]) );
      }
    });

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

  // To trigger this action locally, visit: `http://localhost:port/mem/mem_usage`
  mem_usage: function (req,res)
  {
    var percent = ((os.totalmem() - os.freemem()) / (os.totalmem())) * 100.0;

    // Send a JSON response
    res.send(percent.toFixed(1));
  },

  swap_stats: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo","timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');
    meminfo.forEach(function (item) {
      item = item.replace(/\s+/, ' ');
      item = item.replace(/\skB/, '');
      item = item.replace(/\:/, '');

      if (item !== '') {
        item = item.split(' ');

        if( String(item[0]) == "SwapCached" ||
            String(item[0]) == "SwapTotal" ||
            String(item[0]) == "SwapFree" ) {
          meminfo_json_content[String(item[0])] = parseInt(item[1]);
          //console.log( String(item[0]) + ": " + parseInt(item[1]) );
        }
      }
    });

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

  swap_stats_full: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var wc = require('child_process').spawn('wc', ['-l', '/proc/swaps']);
    var swap_string = new String('off');

    wc.stdout.on('data', function (data) {
      var swap_nb = String(data).split(" ")[0] - 1;
      
      if( swap_nb > 0 )
        swap_string = 'on';
      else
        swap_string = 'off';

      console.log('wc stdout: ' + swap_nb + ' swap partition(s) found.');
    });

    var swap_data = fs.readFileSync("/proc/swaps", "utf8");

    // Create a json containing the infos
    var jsonObj = [{"swap": swap_string}];

    // note: do not forget multiple swap files
    if( swap_nb > 0 ) {
      jsonObj.push([{
        "total": 0,
        "used": 0,
        "free": 0,
        "path": "/swap",
      }]);
    }

    // Send a JSON response
    res.json(jsonObj);
  },

};
module.exports = MemController;
