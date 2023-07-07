module.exports = {
    apps: [
        {
            name: "partchat",
            append_env_to_name: true,
            cwd: "backend",
            script: "./dist/server.js",
            env: {
                JWKS_URL: process.env.JWKS_URL,
            },
            env_production: {
                PORT: 3000,
            },
            env_staging: {
                PORT: 3001,
            },
        },
    ],

    deploy: {
        production: {
            user: process.env.SSH_USER,
            host: process.env.DEPLOY_HOST,
            key: "~/.ssh/github_rsa",
            ref: "origin/main",
            repo: "https://github.com/h4ctar/partchat.git",
            path: "/opt/partchat",
            "post-deploy": "./post-deploy.sh production",
            env: {
                // Backend environment variables
                JWKS_URL: process.env.JWKS_URL,

                // Frontend environment variables
                VITE_AUTH0_DOMAIN: process.env.VITE_AUTH0_DOMAIN,
                VITE_AUTH0_CLIENT_ID: process.env.VITE_AUTH0_CLIENT_ID,
                VITE_AUTH0_API_AUDIENCE: process.env.VITE_AUTH0_API_AUDIENCE,
            },
        },
        staging: {
            user: process.env.SSH_USER,
            host: process.env.DEPLOY_HOST,
            key: "~/.ssh/github_rsa",
            ref: "origin/main",
            repo: "https://github.com/h4ctar/partchat.git",
            path: "/opt/partchat",
            "post-deploy": "./post-deploy.sh staging",
            env: {
                // Backend environment variables
                JWKS_URL: process.env.JWKS_URL,

                // Frontend environment variables
                VITE_AUTH0_DOMAIN: process.env.VITE_AUTH0_DOMAIN,
                VITE_AUTH0_CLIENT_ID: process.env.VITE_AUTH0_CLIENT_ID,
                VITE_AUTH0_API_AUDIENCE: process.env.VITE_AUTH0_API_AUDIENCE,
            },
        },
    },
};
