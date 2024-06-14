#!/bin/bash

# Backup .env
cp .env .env.backup

# Stash local changes
git stash

# Pull latest changes
git pull origin main

# Apply stashed changes
git stash pop

# Restore .env file
mv .env.backup .env

# Rebuild and restart Docker containers
docker-compose pull
docker-compose down
docker-compose up --build -d
