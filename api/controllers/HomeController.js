/*---------------------
	:: Home 
	-> controller
---------------------*/

var os = require('os');

///////////////////////////////////////////////////////////////////////////////

var sys_os_t = os.type() + ' (' + os.arch() + ') ' + os.release();
var sys_cpu_t = ' [' + os.arch() + '] [' + os.endianness() + '] [' + os.cpus().length + ' cores]';
var sys_cpus = os.cpus();
var sys_cpu = os.cpus()[0].model;
var sys_load_avg = (os.loadavg()[0]).toFixed(3) + ', ' + (os.loadavg()[1]).toFixed(3) + ', ' + (os.loadavg()[2]).toFixed(3);

var sys_mem_mb = (os.totalmem() / 1000000).toFixed() + ' Mb';
var sys_mem_mib = (os.totalmem() / 1048576).toFixed() + ' Mib';
var sys_mem_used = ((os.totalmem() - os.freemem()) / 1048576).toFixed() + ' Mib';
var sys_mem_free = (os.freemem() / 1048576).toFixed() + ' Mib';

var sys_swap_mib = new String('off');

var sys_hostname = os.hostname();
var sys_uptime = os.uptime();
var sys_net = os.networkInterfaces();
var sys_tmpdir = os.tmpdir();

///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////

var HomeController = {

  // To trigger this action locally, visit: `http://localhost:port/home/index`
  index: function(req, res) {
    return res.view({
      sys_os_t: sys_os_t,
      sys_cpu_t: sys_cpu_t,
      sys_cpu: sys_cpu,
      sys_cpus: sys_cpus,
      sys_hostname: sys_hostname,
      sys_uptime: sys_uptime,
      sys_load_avg: sys_load_avg,
      sys_mem_mb: sys_mem_mb,
      sys_mem_mib: sys_mem_mib,
      sys_mem_used: sys_mem_used,
      sys_mem_free: sys_mem_free,
      sys_swap_mib: sys_swap_mib,
      sys_net: sys_net,
      sys_tmpdir: sys_tmpdir
    });
  },

  // To trigger this action locally, visit: `http://localhost:port/home/uptime`
  uptime: function (req,res) {
    // Get the value of a parameter
    //var param = req.param('message');
    
    var uptime_num = os.uptime()
    var uptime_string = new String('');

    var sys_uptime_hours = Math.floor(uptime_num / 3600);

    if( sys_uptime_hours > 0 )
    {
      uptime_string = sys_uptime_hours + " hours ";
      uptime_num -= sys_uptime_hours * 3600;
    }

    var sys_uptime_min = Math.floor(uptime_num / 60);

    if( sys_uptime_min > 0 )
    {
      uptime_string += sys_uptime_min + " min ";
      uptime_num -= sys_uptime_min * 60;
    }

    var sys_uptime_sec = Math.floor(uptime_num);

    if( sys_uptime_sec > 0 )
    {
      uptime_string += sys_uptime_sec + " sec";
    }

    // Create a JSON containing the infos
    var jsonObj = [{"uptime": uptime_string}]

    // Send the JSON response
    res.json(jsonObj);

    // Log the JSON response
    //console.log("up : " + uptime_string);
  },

};
module.exports = HomeController;