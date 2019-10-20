-- run as postgres
CREATE USER shop_user WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD 'shop_pass';

CREATE DATABASE shop
    WITH
    OWNER = shop_user
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- run as shop_user
create schema "user";

GRANT ALL ON SCHEMA public TO shop_user;
GRANT ALL ON SCHEMA public TO public;
ALTER SCHEMA public owner TO shop_user;
