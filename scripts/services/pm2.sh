#!/bin/sh
# `/sbin/setuser node` runs the given command as the user `node`.
# If you omit that part, the command will be run as root. https://gist.github.com/scr1p7ed/ee0d96c3795e59244063
exec /sbin/setuser node pm2 start /var/www/node/server.js --node-args="--max-old-space-size=150" --max-memory-restart 200M --name "connectingThings-app" -l /var/log/nodejs/pm2.log --no-daemon
