#!/bin/bash

# Define the directory containing the migration files
migration_dir="backend/cover-letter/migrations"

# Define the output file
output_file="all_migrations.sql"

# Initialize the output file
> "$output_file"

# Loop through each SQL file in the directory and append its content to the output file
for migration_file in "$migration_dir"/*.sql; 
do
    echo "-- Start of $migration_file" >> "$output_file"
    cat "$migration_file" >> "$output_file"
    echo -e "\n-- End of $migration_file\n" >> "$output_file"
done

echo "All migrations have been concatenated into $output_file."
