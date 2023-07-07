#!/bin/sh

set -e

if [ $# -ne 1 ]; then
    echo "Expecting the environment as only argument"
    exit 1
fi

cd backend
npm ci
npm run dbpush
npm run build
cd -

cd frontend
npm ci
npm run build
cd -

pm2 reload ecosystem.config.js --env $1
