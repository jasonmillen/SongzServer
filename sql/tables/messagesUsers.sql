CREATE TABLE messagesUsers (
  messageID BIGINT REFERENCES messages(id),
  userID BIGINT REFERENCES users(id),
  readStatus INT, -- whether or not the user has read the message
  PRIMARY KEY (messageID, userID)
);