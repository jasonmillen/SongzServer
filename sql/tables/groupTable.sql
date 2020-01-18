CREATE TABLE groups (
  id BIGSERIAL PRIMARY KEY,
  creatorID BIGINT REFERENCES users(id),
  playlistID TEXT
);