DROP TABLE messagesusers;
DROP TABLE messages;
DROP TABLE usersgroups;
DROP TABLE groups;
DROP TABLE users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  spotifyUserID TEXT
);

CREATE TABLE groups (
  id BIGSERIAL PRIMARY KEY,
  creatorID BIGINT REFERENCES users(id),
  playlistID TEXT
);

CREATE TABLE usersGroups (
  id BIGSERIAL PRIMARY KEY,
  userID BIGINT REFERENCES users(id),
  groupID BIGINT REFERENCES groups(id)
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  trackID TEXT,
  senderID BIGINT REFERENCES users(id),
  groupID BIGINT REFERENCES groups(id)
);

CREATE TABLE messagesUsers (
  id BIGSERIAL PRIMARY KEY,
  messageID BIGINT REFERENCES messages(id),
  userID BIGINT REFERENCES users(id),
  readStatus INT -- whether or not the user has read the message
);