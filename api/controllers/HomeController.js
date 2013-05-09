/*---------------------
	:: Home 
	-> controller
---------------------*/

var os = require('os');

var sys_os_t = os.type() + ' (' + os.arch() + ') ' + os.release();
var sys_cpu_t = ' [' + os.arch() + '] [' + os.endianness() + '] [' + os.cpus().length + ' cores]';
var sys_cpus = os.cpus();
var sys_cpu = os.cpus()[0].model;

var sys_hostname = os.hostname();
var sys_uptime = (os.uptime()).toFixed() + ' sec';
var sys_load_avg = (os.loadavg()[0]).toFixed(3) + ', ' + (os.loadavg()[1]).toFixed(3) + ', ' + (os.loadavg()[2]).toFixed(3);

var sys_mem_mb = (os.totalmem() / 1000000).toFixed() + ' Mb';
var sys_mem_mib = (os.totalmem() / 1048576).toFixed() + ' Mib';
var sys_mem_used = ((os.totalmem() - os.freemem()) / 1048576).toFixed() + ' Mib';
var sys_mem_free = (os.freemem() / 1048576).toFixed() + ' Mib';

var sys_net = os.networkInterfaces();
var sys_tmpdir = os.tmpdir();

var HomeController = {

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
            sys_net: sys_net,
            sys_tmpdir: sys_tmpdir
        });
  }

};

module.exports = HomeController;