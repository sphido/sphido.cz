---
title: Caddy server
template: theme/docs.html
---

# Caddy server

[Caddy server](https://caddyserver.com/) is the HTTP/2 web server with automatic HTTPS. 
Caddy is easy to configure and easy to maintain - specially for small websites generated 
with Sphido (or something else). It includes native support for Git 
and [Let's Encrypt](https://letsencrypt.org/) thanks to its plugin-based architecture.

The [git plugin](https://caddyserver.com/docs/http.git) makes it possible to deploy your site with a simple git push.

## Combine Caddy and Sphido

Let's have *Caddyfile* with follow content: 
```
www.sphido.org {
  redir https://sphido.org{uri}
}

https://sphido.org {	
  tls roman@omdesign.cz

  root /var/www/sphido.org/public
  log  /var/www/sphido.org/log/access.log
  errors /var/www/sphido.org/log/errors.log

  git {
    repo https://github.com/sphido/sphido.org.git
    path /var/www/sphido.org/
    hook /update [****]
    hook_type generic
    then make
  }

  gzip
  header / Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
}

```

Makefile:

```bash
update:
  yarn install --dev --no-color
  rm -rf ./public
  mkdir -p log public
  yarn run build
  
PHONY: update
```

.yarnrc

```
cache-folder ".cache"
yarn-offline-mirror ".npm"
yarn-offline-mirror-pruning true
--install.prefer-offline true
--install.dev true
```

Webhook on GitHub

<img src="/docs/caddy-server-github.png" class="img-fluid mx-auto d-block" />

## Install Caddy server (on Debian)

```bash
curl https://getcaddy.com | bash -s personal http.git
chown root:root /usr/local/bin/caddy
```

Create directories & configs:

```bash
chmod 755 /usr/local/bin/caddy
touch /etc/caddy/Caddyfile
```

### Prepare Caddy for running
 
Execute the following command to permit the Caddy’s binary file to listen on preferred port:

```bash
apt install libcap2-bin -y # when setcap missing
setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/caddy
```

Create Caddy user:

```bash
groupadd caddy
```

```bash
useradd \
-g caddy \
--home-dir /var/www --no-create-home \
--shell /usr/sbin/nologin \
--system caddy
```

Then, create Caddy's configuration directories and set proper permissions

```bash
mkdir /etc/caddy
touch /etc/caddy/Caddyfile
chown -R root:caddy /etc/caddy
chown caddy:caddy /etc/caddy/Caddyfile
chmod 444 /etc/caddy/Caddyfile
```

Make the SSL directory to store your SSL configurations:

```bash
mkdir /etc/ssl/caddy
chown -R caddy:root /etc/ssl/caddy
chmod 770 /etc/ssl/caddy
```

And create www dir:

```bash
mkdir /var/www
```

### Install Caddy as System Service

Crate `cadddy.service` file: `sudo nano /etc/systemd/system/caddy.service` with follow contains:

```ini
[Unit]
Description=Caddy HTTP/2 web server
Documentation=https://caddyserver.com/docs
After=network-online.target
Wants=network-online.target systemd-networkd-wait-online.service

[Service]
#Restart=on-failure
StartLimitInterval=864000
StartLimitBurst=500

; User and group the process will run as.
User=caddy
Group=caddy

; Letsencrypt-issued certificates will be written to this directory.
Environment=CADDYPATH=/etc/ssl/caddy

; Always set "-root" to something safe in case it gets forgotten in the Caddyfile.
ExecStart=/usr/local/bin/caddy -log stdout -agree=true -conf=/etc/caddy/Caddyfile -root=/var/tmp
ExecReload=/bin/kill -USR1 $MAINPID

; Limit the number of file descriptors; see `man systemd.exec` for more limit settings.
LimitNOFILE=1048576
; Unmodified caddy is not expected to use more than that.
LimitNPROC=64

; Use private /tmp and /var/tmp, which are discarded after caddy stops.
PrivateTmp=true
; Use a minimal /dev
PrivateDevices=true
; Hide /home, /root, and /run/user. Nobody will steal your SSH-keys.
ProtectHome=true
; Make /usr, /boot, /etc and possibly some more folders read-only.
ProtectSystem=full
; … except /etc/ssl/caddy, because we want Letsencrypt-certificates there.
;   This merely retains r/w access rights, it does not add any new. Must still be writable on the host!
ReadWriteDirectories=/etc/ssl/caddy

; The following additional security directives only work with systemd v229 or later.
; They further restrict privileges that can be gained by Caddy. Uncomment if you like.
; Note that you may have to add capabilities required by any plugins in use.
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
;NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
```

Then, change rights:

```bash
chown root:root /etc/systemd/system/caddy.service
chmod 644 /etc/systemd/system/caddy.service
```

Reload *systemctl*:
  
```bash
systemctl daemon-reload
```

```bash
systemctl start caddy
systemctl enable caddy
systemctl restart caddy
systemctl status caddy
```

## Upgrade Caddy server 

```bash
systemctl stop caddy
curl https://getcaddy.com | bash -s personal http.git
systemctl start caddy
```