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
        ;;
    --integration)
        TARGET="bewerbungshelfer-integration"
        ;;
    *)
        echo "Invalid argument. Use --production or --integration"
        exit 1
        ;;
esac

echo "Setting up PostgreSQL on $TARGET..."

# Execute commands on remote server
ssh $TARGET "
    # Install PostgreSQL
    apt-get update
    apt-get install -y postgresql postgresql-client

    # Ensure PostgreSQL is enabled and started
    systemctl enable postgresql
    systemctl start postgresql

    echo 'PostgreSQL installation complete'
"

echo "Deploying PostgreSQL config to $TARGET..."

# Copy config files to server
scp postgresql.conf $TARGET:/root/
scp pg_hba.conf $TARGET:/root/

# Execute commands on remote server
ssh $TARGET "
    # Create timestamped backup filename
    TIMESTAMP=\$(date +%Y%m%d_%H%M%S)

    # Backup existing configs with timestamp
    cp /etc/postgresql/15/main/postgresql.conf /etc/postgresql/15/main/postgresql.conf.backup.\$TIMESTAMP
    cp /etc/postgresql/15/main/pg_hba.conf /etc/postgresql/15/main/pg_hba.conf.backup.\$TIMESTAMP

    # Copy new configs
    cp /root/postgresql.conf /etc/postgresql/15/main/postgresql.conf
    cp /root/pg_hba.conf /etc/postgresql/15/main/pg_hba.conf

    # Set correct ownership
    chown postgres:postgres /etc/postgresql/15/main/postgresql.conf
    chown postgres:postgres /etc/postgresql/15/main/pg_hba.conf

    # Cleanup
    rm /root/postgresql.conf
    rm /root/pg_hba.conf

    # Restart PostgreSQL
    systemctl restart postgresql

    echo 'PostgreSQL config deployed and service restarted'
    echo 'Backup files created with timestamp: '\$TIMESTAMP
"

echo "Deployment complete!"
