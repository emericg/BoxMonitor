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
    var limit = 0;
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo", "timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');
    for( var i in meminfo ) {
      meminfo[i] = meminfo[i].replace(/\s+/, ' ');
      meminfo[i] = meminfo[i].replace(/\skB/, '');
      meminfo[i] = meminfo[i].replace(/\:/, '');

      if( meminfo[i] !== '' ) {
        meminfo[i] = meminfo[i].split(' ');

        if( String(meminfo[i][0]) == "MemTotal" ||
            String(meminfo[i][0]) == "MemFree" ||
            String(meminfo[i][0]) == "Buffers" ||
            String(meminfo[i][0]) == "Cached" ) {
          meminfo_json_content[String(meminfo[i][0])] = parseInt(meminfo[i][1]);
          //console.log( String(meminfo[i][0]) + ": " + parseInt(meminfo[i][1]) );

          // Bail once we have what we need
          limit++;
          if( limit > 3 )
            break;
        }
      }
    }

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

  mem_stats_full: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo", "timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');
    meminfo.forEach(function (item) {
      item = item.replace(/\s+/, ' ');
      item = item.replace(/\skB/, '');
      item = item.replace(/\:/, '');

      if( item !== '' ) {
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

  swap_stats: function (req,res)
  {
    var limit = 0;
    var timestamp_ms = Math.round(Date.now() / 1000);

    var meminfo_data = fs.readFileSync("/proc/meminfo", "utf8");
    var meminfo_json = [{"id": "/proc/meminfo", "timestamp": timestamp_ms}];
    var meminfo_json_content = new Object();

    var meminfo = meminfo_data.split('\n');

    for( var i in meminfo ) {
      meminfo[i] = meminfo[i].replace(/\s+/, ' ');
      meminfo[i] = meminfo[i].replace(/\skB/, '');
      meminfo[i] = meminfo[i].replace(/\:/, '');

      if( meminfo[i] !== '' ) {
        meminfo[i] = meminfo[i].split(' ');

        if( String(meminfo[i][0]) == "SwapCached" ||
            String(meminfo[i][0]) == "SwapTotal" ||
            String(meminfo[i][0]) == "SwapFree" ) {
          meminfo_json_content[String(meminfo[i][0])] = parseInt(meminfo[i][1]);
          //console.log( String(meminfo[i][0]) + ": " + parseInt(meminfo[i][1]) );

          // Bail once we have what we need
          limit++;
          if( limit > 2 )
            break;
        }
      }
    }

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

  swap_stats_full: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var swaps_json = [{"id": "/proc/swaps", "timestamp": timestamp_ms}];
    var swaps_json_content = new Object();

    var swaps_data = fs.readFileSync("/proc/swaps", "utf8");
    var swaps_lines = swaps_data.split('\n');

    // The first line only contains legend
    swaps_lines.splice(0,1);

    for( var i in swaps_lines ) {
      // First, clear whitespaces
      swaps_lines[i] = swaps_lines[i].replace(/ +(?= )/g, '');

      if( swaps_lines[i] !== '' ) {
        swaps_lines[i] = swaps_lines[i].split(' ');

        swaps_json.push([{
          "Filename": swaps_lines[i][0],
          "Type": swaps_lines[i][1],
          "Size": parseInt(swaps_lines[i][2]),
          "Used": parseInt(swaps_lines[i][3]),
          "Priority": parseInt(swaps_lines[i][4]),
        }]);
      }
    }

    // Send a JSON response
    res.json(swaps_json);
  },

};
module.exports = MemController;
