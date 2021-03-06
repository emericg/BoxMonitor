/*---------------------
    :: Mem 
    -> controller
---------------------*/

var fs = require('fs');

var MemController = {

  // To trigger this action locally, visit: `http://localhost:port/mem/index`
  index: function (req,res)
  {
    //
  },

  // Results are retrieved in kB from /proc/meminfo, and converted into kiB
  stats: function (req,res)
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
          meminfo_json_content[String(meminfo[i][0])] = parseInt(meminfo[i][1]) * 1000 / 1024;
          //console.log( String(meminfo[i][0]) + ": " + parseInt(meminfo[i][1]) * 1000 / 1024 );

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

  // Results are retrieved in kB from /proc/meminfo, and converted into kiB
  stats_full: function (req,res)
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
        meminfo_json_content[String(item[0])] = parseInt(item[1]) * 1000 / 1024;
        //console.log( String(item[0]) + ": " + parseInt(item[1]) * 1000 / 1024 );
      }
    });

    meminfo_json.push(meminfo_json_content);

    // Send a JSON response
    //console.log( JSON.stringify(meminfo_json) );
    res.json(meminfo_json);
  },

};
module.exports = MemController;
