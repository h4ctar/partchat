# Part Chat

![Continuous Deployment](https://github.com/h4ctar/partchat/actions/workflows/cd.yaml/badge.svg)

## Pipelines

There is one continuous deployment GitHub workflow.
It runs on all pushes, deploys to a staging environment where it runs the end-2-end tests and if they pass it deploys to prod (only if main branch).

The setup-node action is used to cache node dependencies.
A cache is also created for the playwright binaries; it uses the playwright version in the key to ensure it is updated when the playwright version changes.

![Continuous Deploy Workflow](docs/continuous-deploy-workflow.png)

## End-2-End Tests

End-2-end tests use Playwright and should test all nominal flows.

## Database

The data is persisted in a SQLite database using the Prisma ORM.

![Entity Relationship Diagram](docs/prisma-erd.svg)

## REST Resources

The REST API has these resources:

-   Motorcycle
-   Diagram
-   Diagram / PartReference
-   Part
-   Comment

## Authentication/Authorisation

## Responsive Layouts

## Comment Editor

## Dev Environment

1. Install dependencies:

    ```
    npm install
    ```

2. Build everything:

    ```
    npm run build --workspaces --if-present
    ```

3. Run the backend:

    ```
    cd backend
    npm run db:push
    npm run db:seed
    npm run dev
    ```

4. Run the frontend:

    ```zsh
    cd frontend
    npm run dev
    ```

## Deploy

`partchat@.service`

```
[Unit]
Description=Partchat (%i environment)
Documentation=https://github.com/h4ctar/partchat
After=network.target
[Service]
EnvironmentFile=/etc/partchat/%i.env
Type=simple
User=partchat
WorkingDirectory=/opt/partchat/%i/backend
ExecStart=/usr/bin/node dist/src/server.js
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

`/etc/partchat/staging/env`

```
JWKS_URL=https://auth.h4ctar.com/realms/h4ctar/protocol/openid-connect/certs
ISSUER=https://auth.h4ctar.com/realms/h4ctar
PORT=3001
```

`/etc/nginx/sites-available/staging.partchat.h4ctar`

```
server {
    server_name    staging.partchat.h4ctar.com;

    location ~ /(api|public) {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /opt/partchat/staging/frontend/dist;
        try_files $uri /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/staging.partchat.h4ctar.com/fullchain.pem; # managed
 by Certbot
    ssl_certificate_key /etc/letsencrypt/live/staging.partchat.h4ctar.com/privkey.pem; # manag
ed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = staging.partchat.h4ctar.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name    staging.partchat.h4ctar.com;
    listen 80;
    return 404; # managed by Certbot
}
```

