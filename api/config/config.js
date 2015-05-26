module.exports = {
	port: process.env.PORT || 3000,
    db:{
         default: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test',
         mqtt: process.env.MONGOLAB_MQTT || process.env.MONGOHQ_MQTT || 'mongodb://localhost/mqtt'
    },
    masterKey:"wd40"
}