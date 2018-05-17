CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
id uuid DEFAULT uuid_generate_v4() NOT NULL,
firstname character varying(255),
lastname character varying(255),
email character varying(255) NOT NULL,
password character varying(255),
facebook_id character VARYING(255)
);

ALTER TABLE users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

CREATE TABLE activities (
id uuid DEFAULT uuid_generate_v4() NOT NULL,
title character varying(255) NOT NULL,
id_owner uuid NOT NULL,
status character varying(1) NOT NULL
);

ALTER TABLE activities
ADD CONSTRAINT activities_pkey PRIMARY KEY (id);

CREATE TABLE activity_members (
id uuid DEFAULT uuid_generate_v4() NOT NULL,
id_activity uuid NOT NULL,
id_user uuid NOT NULL
);

ALTER TABLE activity_members
ADD CONSTRAINT activity_members_pkey PRIMARY KEY (id);

ALTER TABLE activity_members
ADD CONSTRAINT fk_activity_members_activities
FOREIGN KEY (id_activity) REFERENCES activities(id);

ALTER TABLE activity_members
ADD CONSTRAINT fk_activity_members_users
FOREIGN KEY (id_user) REFERENCES users(id);

CREATE TABLE expenses (
id uuid DEFAULT uuid_generate_v4() NOT NULL,
title character varying(255) NOT NULL,
id_activity uuid NOT NULL,
id_payer uuid NOT NULL,
amount double precision NOT NULL,
status character varying(1)
);

ALTER TABLE expenses
ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);

ALTER TABLE expenses
ADD CONSTRAINT fk_expenses_activities
FOREIGN KEY (id_activity) REFERENCES activities(id);

CREATE TABLE expense_members (
id uuid DEFAULT uuid_generate_v4() NOT NULL,
id_expense uuid NOT NULL,
id_user uuid NOT NULL
);

ALTER TABLE expense_members
ADD CONSTRAINT expenses_members_pkey PRIMARY KEY (id);

ALTER TABLE expense_members
ADD CONSTRAINT fk_expense_members_expenses
FOREIGN KEY (id_expense) REFERENCES expenses(id);

ALTER TABLE expense_members
ADD CONSTRAINT fk_expense_members_users
FOREIGN KEY (id_user) REFERENCES users(id);

CREATE EXTENSION "pgcrypto";
