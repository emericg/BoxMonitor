BoxMonitor
==========

A realtime Linux system monitoring, using node.js with the Sails framework and d3.js for charting results.

INFOS
-----

- disks usage
- network (interface + basic traffic)
- users connected

REALTIME
--------

#CPU
- detailed chart (cpus, load, freq...)
- process list (clickable)
- process map (on demand ?)

#MEM
- detailed chart (used, cached, buffered...)
- usage map (on demand ?)

#DISK
- detailed IO chart
- (per disk) full disk usage map (on demand)

#NET
- detailed traffic chart
- basic connection tracking ?

#MISC
- devices list (cpuinfo, lspci, lsusb, ...)
- basic per process tracing ? that would be cool
- LXC / cgroup tracing ? that would be cool too

LOGS
----

- dmesg
- custom log file ?

ALERTS
------

- server ping
- responsivness: load and/or memory
- missing system binaries or /proc functionnalities

ABOUT
-----

- todo
