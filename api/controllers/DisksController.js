/*---------------------
    :: Disks 
    -> controller
---------------------*/

///////////////////////////////////////////////////////////////////////////////

var df = require('child_process').spawn('df');

var df_string = new String('loading...');
var df_lines = 0;

df.stdout.on('data', function (data) {
  df_string = String(data);
  //console.log('df stdout: \n' + df_lines);
});

///////////////////////////////////////////////////////////////////////////////

var DisksController = {

  // To trigger this action locally, visit: `http://localhost:port/disks/index`
  index: function (req,res) {

    // Send a JSON response
    res.send(df_string, { 'Content-Type': 'text/html' }, 201);
  },

  // To trigger this action locally, visit: `http://localhost:port/disks/stats`
  stats: function (req,res)
  {
    var timestamp_ms = Math.round(Date.now() / 1000);

    var disks_json = [{"id": "df", "timestamp": timestamp_ms}];
    var disks_json_content = new Object();

    // FIXME Not realtime /!\
    var disks_lines = df_string.split('\n');

    // The first line only contains legend
    disks_lines.splice(0,1);

    for( var i in disks_lines ) {
      // First, clear whitespaces
      disks_lines[i] = disks_lines[i].replace(/ +(?= )/g, '');

      if( disks_lines[i] !== '' ) {
        disks_lines[i] = disks_lines[i].split(' ');

        disks_json.push([{
          "device": disks_lines[i][0],
          "size": parseInt(disks_lines[i][1]),
          "used": parseInt(disks_lines[i][2]),
          "available": parseInt(disks_lines[i][3]),
          "percent": parseInt(disks_lines[i][4]),
          "mountpoint": disks_lines[i][5],
        }]);
      }
    }

    // Send a JSON response
    res.json(disks_json);
  },

};
module.exports = DisksController;