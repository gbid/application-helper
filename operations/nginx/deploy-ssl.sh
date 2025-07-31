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
        DOMAIN="bewerbungshelfer.net"
        DOMAINS="-d bewerbungshelfer.net -d www.bewerbungshelfer.net"
        ;;
    --integration)
        TARGET="bewerbungshelfer-integration"
        CONFIG="integration.bewerbungshelfer.net.conf"
        DOMAIN="integration.bewerbungshelfer.net"
        DOMAINS="-d integration.bewerbungshelfer.net"
        ;;
    *)
        echo "Invalid argument. Use --production or --integration"
        exit 1
        ;;
esac

echo "Setting up SSL certificates on $TARGET..."

# Run certbot
ssh $TARGET "
    # Install certbot if not present
    if ! command -v certbot &> /dev/null; then
        apt-get update
        apt-get install -y certbot
    fi

    # Create webroot directory for ACME challenge
    mkdir -p /var/www/letsencrypt
    chown www-data:www-data /var/www/letsencrypt

    # Get certificate using webroot method
    certbot certonly \
        --webroot \
        --webroot-path /var/www/letsencrypt \
        $DOMAINS \
        --non-interactive \
        --agree-tos \
        --email mail@bidlingmaier.net

    # Set up auto renewal
    systemctl enable certbot.timer
    systemctl start certbot.timer

    echo 'SSL certificate setup complete'
"

# Deploy final configuration
echo "Deploying final nginx configuration..."
scp "sites-available/$CONFIG" "$TARGET:/etc/nginx/sites-enabled/default"
ssh $TARGET "nginx -t && systemctl reload nginx"

echo "SSL setup and nginx configuration complete!"
