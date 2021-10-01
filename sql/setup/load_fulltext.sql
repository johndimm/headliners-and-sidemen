update context set fulltext=to_tsvector('english', title || ' ' || artist);
