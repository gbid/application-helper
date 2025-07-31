#!/bin/bash
set -e

# Check if an argument was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 [--production|--integration]"
    exit 1
fi

# Set target based on argument
case "$1" in
    --production)
        TARGET="bewerbungshelfer"
        DOMAIN="bewerbungshelfer.net"
        ;;
    --integration)
        TARGET="bewerbungshelfer-integration"
        DOMAIN="integration.bewerbungshelfer.net"
        ;;
    *)
        echo "Invalid argument. Use --production or --integration"
        exit 1
        ;;
esac

echo "Setting up nginx on $TARGET..."

ssh $TARGET "
    # Install nginx if not present
    if ! command -v nginx &> /dev/null; then
        apt-get update
        apt-get install -y nginx
    fi

    # Create necessary directories
    mkdir -p /var/www/letsencrypt
    mkdir -p /bewerbungshelfer/frontend

    # Ensure nginx is enabled and started
    systemctl enable nginx
    systemctl start nginx

    echo 'Nginx installation complete'
"

# Deploy temporary configuration
scp "sites-available/temp-config.conf" "$TARGET:/etc/nginx/sites-enabled/default"
ssh $TARGET "nginx -t && systemctl reload nginx"

echo "Setup complete!"
