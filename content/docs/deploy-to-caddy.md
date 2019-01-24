---
title: Automatically deploy Sphido website from GitHub to Caddy server
template: theme/docs.html
slug: deploy-to-caddy
---

# Automatically deploy Sphido website from GitHub to Caddy server

[Caddy server](https://caddyserver.com/) is the HTTP/2 web server with automatic (free) 
HTTPS with [Let's Encrypt](https://letsencrypt.org/). It is lightweight, fast, 
easy to configure, easy to maintain and modern.

Caddy also supports optional [git plugin](https://caddyserver.com/docs/http.git) makes 
it possible to deploy your site with a simple git push. 

## Configure Caddy server

Let's have `Caddyfile` with follow content:
 
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
    hook /update *** your secret goes here ***
    hook_type generic
    then make
  }

  gzip
  header / Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
}
```

The git directive starts a service routine that runs during the lifetime of the server. 
When the service starts, it clones the repository. While the server is still up, 
it pulls the latest every so often. You can also set up a webhook to 
pull immediately after a push. In regular git fashion, a pull only includes 
changes, so it is very efficient. 

**Makefile**

```makefile
update:
  yarn install --dev --no-color
  rm -rf ./public
  mkdir -p log public
  yarn run build
  
PHONY: update
```

**.yarnrc** 

```text
cache-folder ".cache"
yarn-offline-mirror ".npm"
yarn-offline-mirror-pruning true
--install.prefer-offline true
--install.dev true
```

**Webhook on GitHub**

<img src="/docs/deploy-to-caddy.github.png" class="img-fluid mx-auto mb-3 border d-block" />

#### Links:

* [Install Caddy server (on Debian)](/docs/install-caddy)
* [Caddy Server Homepage](https://caddyserver.com/)
* [Let's Encrypt](https://letsencrypt.org/)