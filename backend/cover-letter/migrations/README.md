### Migrations
SQLx manages and applies changes to the database schema using files called _migrations_.

These are simply SQL script files that are run in a particular order. The filenames follow this pattern:

```
<version number>_<name with words separated by underscores>.sql
```
On application startup or when `sqlx migrate run` is executed, SQLx will check with a special `_sqlx_migrations` table
in the database to see which migrations have been applied and which haven't, and apply all that haven't been
in ascending order by their version number.

To ensure the database schema is always reproducible, SQLx also stores the content hash of applied migrations and
checks them against the current contents of the files, so you **must not** change migrations that have already been applied.
