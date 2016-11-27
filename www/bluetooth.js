var num = 0;
var devId = null;
var tokenValue = null;
var serviceValue = null;
var localNameValue = null;
var rssiValue = null;
var charUuid = null;
var charValue = null;
var pointsValue = null;

function init(){
  document.getElementById('logYeah').innerHTML="READY!!";
  document.getElementById('LoGIN').addEventListener('click', logIntoGame);
  document.getElementById('submitValues').addEventListener('click', submitBeacon);
  document.getElementById('scanBLE').addEventListener('click', launchBLE);
  document.getElementById('connectTo').addEventListener('click', connectToPer);
  document.getElementById('disConn').addEventListener('click', disconnectFromPer);
}

function logIntoGame(){
  document.getElementById('getResponse').innerHTML == "clicked";
  var netIDusername = "username="+document.getElementById('netid').value;
  var loginServer = document.getElementById('serverLogin').value + "/login";
  var newReq = new XMLHttpRequest();
  newReq.open("POST", loginServer, true);
  newReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  newReq.setRequestHeader("Content-type", netIDusername.length);
  newReq.send(netIDusername);

  var serverID = loginServer + "/" +document.getElementById('netid').value;
  newReq.open("GET", serverID, false);
  newReq.send(null);

  var message = newReq.responseText;
  document.getElementById('getResponse').innerHTML= "Token: " + JSON.parse(message).token + "<br>" + "Service: " + JSON.parse(message).service + "<br>" + "Characteristic: " + JSON.parse(message).characteristic + "<br>" ;

  tokenValue = JSON.parse(message).token;
  serviceValue = JSON.parse(message).service;
  charValue = JSON.parse(message).characteristic;

  document.getElementById('token').value = tokenValue;

  document.getElementById('testthis').innerHTML = tokenValue;
}


function submitBeacon(){
  var sendData = new Object();
  sendData.token = document.getElementById('token').value;
  sendData.localname = document.getElementById('localname').value;
  sendData.rssi = document.getElementById('rssi').value;
  sendData.characteristic = document.getElementById('characteristic').value;
  sendData.points = document.getElementById('points').value;
  var beaconServer = document.getElementById('serverLogin').value + "/beacon";
  var makeReq = new XMLHttpRequest();
  makeReq.open('POST', beaconServer, true);
  makeReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  makeReq.setRequestHeader("Content-type", sendData.length);
  makeReq.send(sendData);

  document.getElementById('testthis').innerHTML= JSON.stringify(sendData);

}

// Bluetooth parameters
function launchBLE(){
  num++;

//JSON.stringify(device.advertising)

  ble.startScan([], function(device) {

    if (device.advertising.kCBAdvDataServiceUUIDs == serviceValue){
      devId = device.id;
    }

    document.getElementById('logNotes').innerHTML = "<p>" + device.id + "\r\n" + device.rssi + "\r\n" + device.name  + "\r\n" + device.advertising.kCBAdvDataLocalName + "\r\n" + device.advertising.kCBAdvDataServiceUUIDs + "\r\n" + document.getElementById('logNotes').innerHTML + "</p>";
}, failure);

setTimeout(ble.stopScan,
    5000,
    function() { document.getElementById('logYeah').innerHTML="Scan complete"; },
    function() { document.getElementById('logYeah').innerHTML="stopScan failed"; }
);
  document.getElementById('logYeah').innerHTML=num;
}

function failure(){
  console.log("error");
}

function connectToPer(){
  document.getElementById('logNotes').innerHTML="";
  ble.connect(devId, connectSuccess, connectFailure);
}

function connectSuccess(data){
  document.getElementById('connectNotes').innerHTML= data.advertising.kCBAdvDataLocalName + "\n\r" + data.rssi + "\n\r"+ data.characteristics[0].service + "\n\r"+ data.characteristics[0].characteristic;

  rssiValue = data.rssi;
  localNameValue = data.advertising.kCBAdvDataLocalName;
  charUuid = data.characteristics[0].service;
  charValue = data.characteristics[0].characteristic;

  document.getElementById('rssi').value = rssiValue;
  document.getElementById('localname').value = localNameValue;
  document.getElementById('characteristic').value = charUuid;
  document.getElementById('points').value = charValue;

  /*
  document.getElementById('rssi').value = data.rssi;
  document.getElementById('localname').value = data.advertising.kCBAdvDataLocalName;
  document.getElementById('characteristic').value = data.characteristics[0].service;
  document.getElementById('points').value = data.characteristics[0].characteristic;
  */
}

function connectFailure(){
  document.getElementById('connectNotes').innerHTML="OH NO! Not Connected";
}

function disconnectFromPer(){
  ble.disconnect(devId, disSuccess);
}

function disSuccess(){
  document.getElementById('connectNotes').innerHTML="Disconnected";
}


document.addEventListener("deviceready", init, false);
