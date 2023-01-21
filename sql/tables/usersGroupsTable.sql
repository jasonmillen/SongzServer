CREATE TABLE usersGroups (
  id BIGSERIAL PRIMARY KEY,
  userID BIGINT REFERENCES users(id),
  groupID BIGINT REFERENCES groups(id)
);