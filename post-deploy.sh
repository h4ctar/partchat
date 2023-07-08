#!/bin/sh

set -e

if [ $# -ne 1 ]; then
    echo "Expecting the environment as only argument"
    exit 1
fi

(
    cd types
    npm ci
)

(
    cd backend
    npm ci
    npm run dbpush
    npm run build
)

(
    cd frontend
    npm ci
    npm run build
)

pm2 startOrRestart ecosystem.config.js --env $1
