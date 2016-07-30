
'var ttn = require("ttn");'+
'var mqtt = require("mqtt");'+
'var mqttClient = mqtt.connect({  port: 1883, host: "app.connectingthings.io",  keepalive: 10000,  protocolId: "MQIsdp",  protocolVersion: 3 });'+
'var ttnClient = new ttn.Client("staging.thethingsnetwork.org", "70B3D57ED0000791", "pE4XWgJbitDAt+OyTz4Y4pE1SrrAtfwsrWa3lEF/6Yc=");'+
'ttnClient.on("uplink", (msg) =>{'+
'  mqttClient.publish(`/device/${msg.fields.device}/key/${msg.fields.key}`, `{"value": "${msg.fields.value}","tag": "${msg.fields.tag}"}`);'+
'});'