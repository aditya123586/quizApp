BEGIN;

CREATE SCHEMA grocery
AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS grocery.product_master
(
    product_id serial PRIMARY KEY,
    sku_id varchar(50) COLLATE pg_catalog."default" NOT NULL,
    product_name varchar(255) COLLATE pg_catalog."default" NOT NULL,
    product_description text COLLATE pg_catalog."default",
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    price numeric,
    CONSTRAINT product_master_sku_id_key UNIQUE (sku_id)
);

CREATE TABLE IF NOT EXISTS grocery.product_inventory
(
    inventory_id serial PRIMARY KEY,
    product_id integer,
    quantity integer NOT NULL,
    CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES grocery.product_master (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE SCHEMA "order"
AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS "order".ordermaster
(
    order_id serial PRIMARY KEY,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_amount numeric(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "order".orderdetails
(
    order_detail_id serial PRIMARY KEY,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price_per_unit numeric(10,2) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    CONSTRAINT fk_orderdetails_order_id FOREIGN KEY (order_id)
        REFERENCES "order".ordermaster (order_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_orderdetails_product_id FOREIGN KEY (product_id)
        REFERENCES grocery.product_master (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE SCHEMA "user"
AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS "user".roles
(
    role_id serial PRIMARY KEY,
    role_name varchar(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT roles_role_name_key UNIQUE (role_name)
);

CREATE TABLE IF NOT EXISTS "user".usermaster
(
    user_id serial PRIMARY KEY,
    username varchar(255) COLLATE pg_catalog."default" NOT NULL,
    password varchar(255) COLLATE pg_catalog."default" NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT usermaster_username_key UNIQUE (username),
    CONSTRAINT usermaster_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES "user".roles (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO "user".roles(role_name) VALUES ('Admin');
INSERT INTO "user".roles(role_name) VALUES ('Normal');

INSERT INTO "user".usermaster(username, password, role_id)
VALUES 
    ('admin_user', 'admin_password', 1),
    ('normal_user', 'normal_password', 2);

END;
