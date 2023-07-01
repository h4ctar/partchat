server {
    server_name partchat.h4ctar.com;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /opt/partchat/current/frontend/dist;
        try_files $uri /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/partchat.h4ctar.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/partchat.h4ctar.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = partchat.h4ctar.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name partchat.h4ctar.com;
    listen 80;
    return 404; # managed by Certbot
}