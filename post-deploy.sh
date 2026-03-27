#!/bin/sh

set -e

if [ $# -ne 1 ]; then
    echo "Expecting the environment as only argument"
    exit 1
fi

npm ci --omit=dev
npm run dbpush --workspace backend

cat > frontend/dist/config.js << EOF
window.ENV = {
    AUTHORITY: "$AUTHORITY",
    CLIENT_ID: "$CLIENT_ID"
};
EOF

pm2 startOrRestart ecosystem.config.js --env $1
