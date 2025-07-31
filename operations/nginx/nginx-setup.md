# Nginx Server Setup Documentation

This folder contains scripts and configuration files for setting up and maintaining nginx web servers for the Bewerbungshelfer project. The setup includes automatic SSL certificate management via Let's Encrypt/Certbot.

## Overview

The setup supports two environments:
- Production (`bewerbungshelfer.net`)
- Integration (`integration.bewerbungshelfer.net`)

## Directory Structure

```
.
├── sites-available/
│   ├── bewerbungshelfer.net.conf         # Production nginx configuration
│   ├── integration.bewerbungshelfer.net.conf  # Integration nginx configuration
│   └── temp-config.conf                  # Temporary config for SSL setup
├── setup.sh                              # Initial server setup script
├── deploy-ssl.sh                         # SSL and final nginx config deployment
├── deploy.sh                             # Nginx config deployment only
└── nginx-setup.md                        # This documentation
```

## Server Configuration Details

### SSL Certificates

- Managed by Let's Encrypt via Certbot
- Auto-renewal enabled via systemd timer
- Certificates stored in `/etc/letsencrypt/live/[domain]/`

## Setup Process

### Prerequisites

1. Target server with:
   - Ubuntu/Debian-based OS
   - SSH access with sudo privileges
   - Proper DNS records pointing to the server
   - Ports 80 and 443 accessible

2. Local machine with:
   - SSH access to target server configured
   - Bash shell
   - SSH key-based authentication recommended

### Initial Setup
0. Optional: Copy over existing SSL certificates to the server:
```bash
rsync -av [source]:/etc/letsencrypt/ /tmp/letsencrypt/
rsync -av /tmp/letsencrypt/ [target]:/etc/letsencrypt/
```
The certbot setup later will use these certificates and check for renewal.
For for a log message like "Certificate not yet due for renewal" after step 2.
1. Initial server setup:
```bash
./setup.sh --production    # For production server
# or
./setup.sh --integration  # For integration server
```
This will:
- Install nginx if not present
- Create necessary directories
- Deploy temporary nginx configuration

2. SSL and final configuration deployment:
```bash
./deploy-ssl.sh --production    # For production server
# or
./deploy-ssl.sh --integration  # For integration server
```
This will:
- Install Certbot
- Obtain SSL certificates
- Deploy final nginx configuration with HTTPS support

### Maintenance Operations

#### Updating Nginx Configuration

To deploy updated nginx configurations:
```bash
./deploy.sh --production    # For production server
# or
./deploy.sh --integration  # For integration server
```

## Directory Locations

- Frontend files: `/bewerbungshelfer/frontend/`
- Let's Encrypt validation files: `/var/www/letsencrypt/`
- Nginx configuration: `/etc/nginx/sites-enabled/default`
- SSL certificates: `/etc/letsencrypt/live/[domain]/`

## Troubleshooting

### Common Issues

1. Nginx config test fails:
   ```bash
   ssh [target] "nginx -t"
   ```

2. Certificate renewal issues:
   ```bash
   ssh [target] "certbot renew --dry-run"
   ```

3. Check nginx status:
   ```bash
   ssh [target] "systemctl status nginx"
   ```

4. Check certbot timer:
   ```bash
   ssh [target] "systemctl status certbot.timer"
   ```

### Log Locations

- Nginx error log: `/var/log/nginx/error.log`
- Nginx access log: `/var/log/nginx/access.log`
- Certbot log: `/var/log/letsencrypt/`
