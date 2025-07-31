# Operations Documentation

This directory contains scripts and configurations for setting up and maintaining the Bewerbungshelfer infrastructure, consisting of a production and integration server, each debian 12, running the following components:
- PostgreSQL database
- Nginx web server serving frontend and forwarding /api to the backend service
- Bewerbungshelfer backend systemd service

I strived to make all scripts idempotent, but have tested idempotency only very shallowly.


# Prerequisites
The scripts assume you have ssh access to the root user of the servers at `bewerbungshelfer.net` and `integration.bewerbungshelfer.net` via `ssh bewerbungshelfer` and `ssh bewerbungshelfer-integration` respectively.
Set your .ssh/config file accordingly, e.g. with the following content:
Also note that DNS records need to be set up.
At the time of this writing, the DNS records are configured in the cloudflare dashboard, since we registered the `bewerbungshelfer.net` domain with cloudflare.

```
Host bewerbungshelfer-integration
	HostName 5.75.179.192
	User root
	IdentityFile $HOME/.ssh/id_rsa
Host bewerbungshelfer
	HostName 49.13.159.154
	User root
	IdentityFile $HOME/.ssh/id_rsa
```


## Directory Structure

```
operations/
├── bewerbungshelfer.service     # Systemd service file for backend
├── cli/                         # CLI utilities setup
├── deploy                       # Main deployment script
├── nginx/                       # Nginx configuration and setup
├── postgres/                    # PostgreSQL configuration and setup
└── operations.md               # This documentation
```

## Quick Start

1. Set up infrastructure (in any order):
```bash
# Install CLI utilities
./cli/setup.sh [--production|--integration]

# Set up PostgreSQL
cd postgres
./setup.sh [--production|--integration]

# Set up Nginx including SSL certificates with certbot, let's encrypt
# Refer to nginx/nginx-setup.md for instructions.
```

2. Build and deploy application, from the operations/ directory:
```bash
./deploy [--production|--integration]
```

## Component Details

### Backend Service
`bewerbungshelfer.service` configures the systemd service that runs the backend.

### CLI Setup
`cli/setup.sh` installs necessary command-line utilities required by the backend.

### Nginx
See `nginx/nginx-setup.md` for detailed documentation on the nginx setup.

### PostgreSQL
`postgres/` contains:
- `postgresql.conf`: Main PostgreSQL configuration
- `pg_hba.conf`: Client authentication configuration
- `setup.sh`: Installation and configuration script

## Environment Configuration

Two environments are supported:
- Production (`bewerbungshelfer.net`)
- Integration (`integration.bewerbungshelfer.net`)

Use the appropriate flag (`--production` or `--integration`) when running setup and deployment scripts.

## Directory Locations

- Backend binary: `/home/bewerbungshelfer/backend`
- Frontend files: `/home/bewerbungshelfer/frontend/`
- Environment file: `/home/bewerbungshelfer/.env`
- Nginx config: `/etc/nginx/sites-enabled/`
- PostgreSQL data: `/var/lib/postgresql/` (I have not verified this)

## Common Operations

## Troubleshooting

### Log Locations
- Backend: `journalctl -xeu bewerbungshelfer`
- Nginx: `/var/log/nginx/`
- PostgreSQL: `/var/log/postgresql/` (I have not verified this)

