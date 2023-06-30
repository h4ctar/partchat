module.exports = {
    apps: [
        {
            name: "partchat-backend",
            cwd: "backend",
            script: "./dist/server.js",
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
        },
    },
};
