BoxMonitor
==========

A realtime Linux system monitoring, using node.js with the Sails framework and d3.js for charting results.

* Local or remote monitoring
* Simple password protection (authenticate the computer not the user)
> Do not disrupt the "server"
* Maximum of client side computation
* No persistent data or configuration on the server
* Long monitoring period / special configuration > client side storage ?

BoxMonitor pages
================

INFOS
-----

- cpu (threads vs processes ?)
- disks usage (virtual, physical, other)
- network (interface + basic traffic infos (data transfered, speed ?)
- users connected (nb, sources)
- "connected from" ?

REALTIME
--------

#CPU
- detailed chart (cpus, load, freq...)
- process list (clickable)
- process map (pretty graph, on demand)

#MEM
- detailed chart (used, cached, buffered...)
- usage map (pretty graph, on demand)

#DISK
- detailed IO chart
- (per disk) full disk usage map (pretty graph, on demand)
- open file descriptors

#NET
- detailed network trafic chart
- data transfered
- basic connection tracking ?

#MISC
- devices list (cpuinfo, lspci, lsusb, ...)
- basic per process tracing ? that would be cool
- LXC / cgroup tracing ? that would be cool too

LOGS
----

- dmesg
- custom log files ?

ALERTS (page or popup ?)
------

- server ping
- responsivness: load and/or memory
- missing system binaries or /proc functionnalities

ABOUT
-----

- general infos about the software and the devs
