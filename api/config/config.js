module.exports = {
  port: process.env.PORT || 3000,
  db:{
    default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.LOCAL_URL || 'mongodb://admin:system2610@dev.connectingthings.io/test',
    mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || process.env.LOCAL_MQTT || 'mongodb://admin:system2610@dev.connectingthings.io/mqtt',
  },
  masterKey:"wd40"
};

// mongodb://admin:QZi6&3fz@ds025719-a0.mlab.com:25719,ds025719-a1.mlab.com:25719/main?replicaSet=rs-ds025719