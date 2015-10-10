#! /bin/bash

psql -U postgres -d postgres -f dbUser.sql
psql -U postgres -d postgres -c "DROP DATABASE feedthesheep;"
psql -U postgres -d postgres -c "CREATE DATABASE feedthesheep WITH owner=foo ENCODING='utf-8';"

psql -U foo -d feedthesheep -f schema.sql
