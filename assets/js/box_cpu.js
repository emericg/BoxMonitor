
function freq() {
  socket.request('/cpu/freq', {
    message: 'freq'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_freq').innerHTML = JSON.stringify(response);
  });
}

function freq_avg() {
  socket.request('/cpu/freq_avg', {
    message: 'freq_avg'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_freq_avg').innerHTML = JSON.stringify(response);
  });
}

function load_avg() {
  socket.request('/cpu/load_avg', {
    message: 'load_avg'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_load_avg').innerHTML = JSON.stringify(response);
  });
}

function usage() {
  socket.request('/cpu/usage', {
    message: 'usage'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_usage').innerHTML = JSON.stringify(response);
  });
}

function usage_avg() {
  socket.request('/cpu/usage_avg', {
    message: 'usage_avg'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_usage_avg').innerHTML = JSON.stringify(response);
  });
}

var socket = io.connect('http://localhost:1337');

var interval0 = setInterval(load_avg, 5000);
var interval1 = setInterval(freq, 1000);
var interval2 = setInterval(freq_avg, 1000);
var interval3 = setInterval(usage, 1000);
var interval4 = setInterval(usage_avg, 1000);
