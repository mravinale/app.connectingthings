module.exports = {
  port: process.env.PORT || 3000,
  db:{
    default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.LOCAL_URL || 'mongodb://admin:system2610@app.connectingthings.io/test',
    mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || process.env.LOCAL_MQTT || 'mongodb://admin:system2610@app.connectingthings.io/mqtt',
  },
  masterKey:"wd40"
};
