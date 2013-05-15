/*---------------------
    :: Disks 
    -> controller
---------------------*/

var df = require('child_process').spawn('df');

var df_string = new String('loading...');
var df_lines = 0;

df.stdout.on('data', function (data) {
  df_string = String(data);
  df_lines = String(data).split("\n");
  console.log('df stdout: ' + df_string);
  console.log('df line: ' + df_lines);
});

var DisksController = {

  // To trigger this action locally, visit: `http://localhost:port/disks/index`
  index: function (req,res) {

    // Send a JSON response
    res.send(df_string, { 'Content-Type': 'text/html' }, 201);
  },

};
module.exports = DisksController;