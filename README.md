BoxMonitor
==========

A realtime Linux system monitoring, using node.js with the Sails framework and d3.js for charting results.

Features
--------

- System informations
- CPU monitoring
- RAM overview
- Disks usage

Requirements
------------

- Node.js (version 0.10)
- Sails.js (version 0.8.9x)
- A Linux system, with unrestricted read access to the /proc virtual filesystem.

Installation
------------

> $ git clone https://github.com/emericg/BoxMonitor.git  
> $ cd BoxMonitor  
> $ npm install  
> $ node app.js  

Then you can open the application with your browser at <http://localhost:1337/>.  
You can also change the default port inside 'config/application.js'.

Website
-------

You can browse the project's GitHub page and wiki at <https://github.com/emericg/BoxMonitor>

License
-------

GPL v3 <http://www.gnu.org/licenses/gpl-3.0.txt>

Screenshots!
------------

![BoxMonitor 'infos' tab](https://github.com/emericg/BoxMonitor/raw/master/public/images/BoxMonitor.png)
