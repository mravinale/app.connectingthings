# Start with Ubuntu Trusty
FROM        phusion/baseimage

# Use baseimage-docker's init system.
CMD         ["/sbin/my_init"]

# Add node.js repo
RUN	        sudo apt-get -y install software-properties-common \
                && sudo add-apt-repository ppa:chris-lea/node.js \
                && sudo apt-get update

# Install node from repo, then install node package manager and switch version
RUN 	    sudo apt-get -y install build-essential nodejs python wget curl \
                xvfb php5-curl curl libxrender1 libfontconfig1 xorg libssl-dev \
                fontconfig libjpeg8 xfonts-75dpi libjpeg-turbo8 \
                && npm install -g n \
                && n 0.12.7 \
                && npm install -g node-gyp \
                && npm install -g pm2

# Clean up APT when done.
RUN         sudo apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy source files to container
COPY	    . /var/www/node

# Change owner to non-root node user and set up permissions
RUN         sudo useradd -m node && mkdir /var/log/nodejs && sudo chown -R node:node /var/www/node /var/log/

# Install all my packages
RUN	        cd /var/www/node && /sbin/setuser node npm install

# Setup PM2 list > log directory every minute
COPY        ./scripts/cron/pm2-list-crontab /etc/cron.d/pm2-list-crontab
RUN         chmod 0644 /etc/cron.d/pm2-list-crontab && crontab /etc/cron.d/pm2-list-crontab

# Open local port 3000
EXPOSE	    3000

# Run PM2 as a daemon managed by runit
RUN         mkdir /etc/service/pm2
ADD         ./scripts/services/pm2.sh /etc/service/pm2/run
