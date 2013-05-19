BoxMonitor
==========

A realtime Linux system monitoring, using node.js with the Sails framework and d3.js for charting results.

Features
--------

- System informations
- CPU monitoring
- RAM overview
- Disks usage
- And more to come...

Requirements
------------

- Node.js (version 0.10 ?)
- A Linux, system with unrestricted access to the /proc virtual filesystem.

Installation
------------

> $ git clone https://github.com/emericg/BoxMonitor.git  
> $ npm install  
> $ node app  

Then you can browse <http://localhost:1337/>
You can also change the default port inside 'config/application.js'.

Licence
-------

GPL v3 <http://www.gnu.org/licenses/gpl-3.0.txt>

Screenshots!
------------

![BoxMonitor 'infos' tab](https://github.com/emericg/BoxMonitor/raw/master/public/images/BoxMonitor.png)
