-- Schemas for the walking app database.

CREATE TABLE walk_sessions (
  id integer primary key,
  date text not null,
  duration_sec integer not null,
  distance_km real not null,
  steps integer not null,
  avg_speed real not null,
  calories integer,
  created_at text default (datetime('now'))
);

CREATE TABLE goals (
  id integer primary key,
  order_index integer not null,
  name text not null,
  start_city text not null,
  end_city text not null,
  start_lat real not null,
  start_lng real not null,
  end_lat real not null,
  end_lng real not null,
  segment_km real not null
);
