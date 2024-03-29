module.exports = {
    apps: [
        {
            name: "partchat",
            append_env_to_name: true,
            cwd: "backend",
            script: "./dist/server.js",
            env: {
                JWKS_URL: process.env.JWKS_URL,
                ISSUER: process.env.ISSUER,
            },
            env_staging: {
                PORT: 3001,
            },
            env_production: {
                PORT: 3000,
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
            path: "/opt/partchat-production",
            "post-deploy": "./post-deploy.sh production",
            env: {
                JWKS_URL: process.env.JWKS_URL,
                ISSUER: process.env.ISSUER,
                VITE_CLIENT_ID: process.env.VITE_CLIENT_ID,
                VITE_AUTHORITY: process.env.VITE_AUTHORITY,
            },
        },
        staging: {
            user: process.env.SSH_USER,
            host: process.env.DEPLOY_HOST,
            key: "~/.ssh/github_rsa",
            ref: `origin/${process.env.GITHUB_REF_NAME}`,
            repo: "https://github.com/h4ctar/partchat.git",
            path: "/opt/partchat-staging",
            "post-deploy": "./post-deploy.sh staging",
            env: {
                JWKS_URL: process.env.JWKS_URL,
                ISSUER: process.env.ISSUER,
                VITE_CLIENT_ID: process.env.VITE_CLIENT_ID,
                VITE_AUTHORITY: process.env.VITE_AUTHORITY,
            },
        },
    },
};
