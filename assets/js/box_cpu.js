
function load_avg() {
  socket.request('/cpu/load', {
    message: 'cpu'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_avg').innerHTML = JSON.stringify(response);
  });
}

function load_instant() {
  socket.request('/cpu', {
    message: 'cpu'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_instant').innerHTML = JSON.stringify(response);
  });
}

function load_instant_avg() {
  socket.request('/cpu/percent', {
    message: 'cpu'
  }, function (response) {
    //console.log(JSON.stringify(response));
    document.getElementById('cpu_instant_avg').innerHTML = JSON.stringify(response);
  });
}

var socket = io.connect('http://localhost:1337');

load_avg();
load_instant();
load_instant_avg();

var interval1 = setInterval(load_avg, 5000);
var interval2 = setInterval(load_instant, 1000);
var interval3 = setInterval(load_instant_avg, 1000);
