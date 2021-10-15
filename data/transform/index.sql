-- set search_path=context;

create index idx_c_rg on context_xfer(release_group);
create index idx_cov_id on covers(id);
