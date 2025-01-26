#!/bin/bash
cd /home/huy/GitHub/qhacksRepo/notlikeus
npm run build
pm2 restart REVAISE
