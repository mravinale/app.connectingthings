module.exports = {
  port: process.env.PORT || 3000,
  db:{
    default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.LOCAL_URL || 'mongodb://admin:system2610@ds059215.mongolab.com:59215/connectingthings',
    mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || process.env.LOCAL_MQTT || 'mongodb://admin:system2610@ds053648.mongolab.com:53648/mqtt'
  },
  masterKey:"wd40"
};

/*
 db:{
 default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.LOCAL_URL || 'mongodb://admin:system2610@app.connectingthings.io/test',
 mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || process.env.LOCAL_MQTT || 'mongodb://admin:system2610@app.connectingthings.io/mqtt'
 },
 */