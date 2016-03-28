#!/bin/sh
# `/sbin/setuser node` runs the given command as the user `node`.
# If you omit that part, the command will be run as root.
exec /sbin/setuser node pm2 start /var/www/node/server.js -i 0 --name "connectingThings-app" -l /var/log/nodejs/pm2.log --no-daemon && /etc/init.d/newrelic-sysmond start
