module.exports = {
    apps: [
        {
            name: "partchat-backend",
            cwd: "backend",
            script: "./dist/server.js",
            env: {
                JWKS_URL: process.env.JWKS_URL,
            },
        },
    ],

    deploy: {
        production: {
            user: process.env.DEPLOY_USER,
            host: process.env.DEPLOY_HOST,
            key: process.env.DEPLOY_KEY,
            ref: "origin/main",
            repo: "https://github.com/h4ctar/partchat.git",
            path: "/opt/partchat",
            "post-deploy":
                "npm run post-deploy && pm2 startOrRestart ecosystem.config.js --name partchat-backend",
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
