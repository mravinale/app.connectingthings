# Start with Ubuntu Trusty
FROM        phusion/baseimage:0.9.18

# Use baseimage-docker's init system.
CMD         ["/sbin/my_init"]

# Add node.js repo
RUN	        sudo apt-get -y install software-properties-common \
                && sudo add-apt-repository ppa:chris-lea/node.js \
                && sudo apt-get update

# Install node from repo, then install node package manager and switch version
RUN 	    sudo apt-get -y install build-essential nodejs python ca-certificates wget curl \
                xvfb php5-curl curl libxrender1 libfontconfig1 xorg libssl-dev \
                fontconfig libjpeg8 xfonts-75dpi libjpeg-turbo8 git-all \
                && npm install -g n \
                && n 0.12.18 \
                && npm install -g node-gyp \
                && npm install pm2 -g --no-optional \
                && npm install -g grunt-cli \
                && npm install -g bower

# Install new relic monitor
RUN 	    echo deb http://apt.newrelic.com/debian/ newrelic non-free >> /etc/apt/sources.list.d/newrelic.list \
            && wget -O- https://download.newrelic.com/548C16BF.gpg | apt-key add - \
            && apt-get update \
            && apt-get install newrelic-sysmond \
            && nrsysmond-config --set license_key=2ee1720a0a13b11e1c8f46389d11af1ab2f3be29

# Clean up APT when done.
RUN         sudo apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy source files to container
COPY	    . /var/www/node

# Change owner to non-root node user and set up permissions
RUN         sudo chmod -R 777 var/www/node /var/log/
RUN         sudo useradd -m node && mkdir /var/log/nodejs && sudo chown -R node:node /var/www/node /var/log/

# Install all my packages
RUN	        cd /var/www/node && /sbin/setuser node npm install --force #refresh ponte

# Setup PM2 list > log directory every minute
COPY        ./scripts/cron/pm2-list-crontab /etc/cron.d/pm2-list-crontab
RUN         chmod 0644 /etc/cron.d/pm2-list-crontab && crontab /etc/cron.d/pm2-list-crontab

# Open local port 3000
EXPOSE	    3000
EXPOSE	    3001
EXPOSE	    1883
EXPOSE	    1884

# Run PM2 as a daemon managed by runit
RUN         mkdir /etc/service/pm2 && sudo chmod -R 777 /etc/service/pm2
ADD         ./scripts/services/pm2.sh /etc/service/pm2/run
RUN         sudo chmod -R 777 /etc/service/pm2
