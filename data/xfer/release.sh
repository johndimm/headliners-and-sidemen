drop schema if exists last_good cascade;

create schema last_good;

alter table public.context set schema last_good;

alter table staging.context set schema public;

psql -f ../transform/functions.sql
