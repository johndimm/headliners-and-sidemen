drop index if exists idx_context_gin;
CREATE INDEX idx_context_gin ON context USING GIN (fulltext);
