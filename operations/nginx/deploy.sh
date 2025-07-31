#!/bin/bash
set -e

if [ $# -ne 1 ]; then
    echo "Usage: $0 [--production|--integration]"
    exit 1
fi

case "$1" in
    --production)
        TARGET="bewerbungshelfer"
        CONFIG="bewerbungshelfer.net.conf"
        ;;
    --integration)
        TARGET="bewerbungshelfer-integration"
        CONFIG="integration.bewerbungshelfer.net.conf"
        ;;
    *)
        echo "Invalid argument. Use --production or --integration"
        exit 1
        ;;
esac

echo "Deploying nginx configuration to $TARGET..."

# Copy nginx config
scp "sites-available/$CONFIG" "$TARGET:/etc/nginx/sites-enabled/default"

# Reload nginx
ssh $TARGET "nginx -t && systemctl reload nginx"

echo "Nginx configuration deployed!"
