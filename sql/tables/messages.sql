CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  trackID TEXT,
  senderID BIGINT REFERENCES users(id),
  groupID BIGINT REFERENCES groups(id)
);