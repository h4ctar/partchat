#!/bin/sh

cd backend
npm ci
npm run dbpush
npm run build
cd -

cd frontend
npm ci
npm run build
cd -

pm2 startOrRestart ecosystem.config.js --name partchat-backend
