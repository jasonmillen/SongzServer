CREATE TABLE usersGroups (
  userID BIGINT REFERENCES users(id),
  groupID BIGINT REFERENCES groups(id),
  PRIMARY KEY (userID, groupID)
);