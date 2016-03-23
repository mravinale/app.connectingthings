module.exports = {
  port: process.env.PORT || 3000,
  db:{
    default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.LOCAL_URL || 'mongodb://10.7.0.3:27017,10.7.0.5:27017/main',
    mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || process.env.LOCAL_MQTT || 'mongodb://10.7.0.3:27017,10.7.0.5:27017/mqtt',
  },
  masterKey:"wd40"
};
