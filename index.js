import express from 'express';

import { 
  getTokens,
  refreshTokens
 } from './util/spotifyApi';

import * as db from './services/database/db';

const app = express();
app.use(express.json());

const spotifyCredentials = {
  clientId: '4424b4c861ab4ebbba8c5a432253c2eb',
  clientSecret: '3c60035d220540bf8b51e1107fe1556a',
  redirectUri: 'https://auth.expo.io/@jasonmillen/AwesomeProject'
};

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/healthcheck', (req, res) => {
  res.send('Hello World');
})

app.post('/api/getSpotifyToken', async (req, res) => {
  console.log('getting spotify token');
  console.log(req.body);
  const authCode = req.body.authCode;
  const tokenData = await getTokens(authCode, spotifyCredentials);
  console.log("token data: ", tokenData);
  res.send(tokenData);
});

app.post('/api/refreshSpotifyToken', async (req, res) => {
  console.log('refreshing spotify token');
  console.log(req.body);
  const refreshToken = req.body.refreshToken;
  const tokenData = await refreshTokens(refreshToken, spotifyCredentials);
  console.log('new token data', tokenData);
  res.send(tokenData);
});

app.get('/api/user/:spotifyUserID/spotify', async (req, res) => {
  const spotifyUserID = req.params.spotifyUserID;
  console.log('getting user with id', spotifyUserID);
  let user = await db.getUserBySpotifyUserID(spotifyUserID);
  if (!user) {
    console.log('user not found');
    user = {};
  }
  res.send(user);
});

app.post('/api/user/create', async (req, res) => {
  const spotifyUserID = req.body.spotifyUserID;
  console.log('got spotify user id', spotifyUserID);
  const user = await db.addUser(spotifyUserID);
  console.log('created new user: ', user);
  res.status(200).send({
    msg: 'OK',
    user
  });
});

app.post('/api/group/create', async (req, res) => {
  const creatorID = req.body.creatorID;
  const memberSpotifyIDs = req.body.memberSpotifyIDs;
  const playlistID = req.body.playlistID;

  console.log('SERVER GOT:');
  console.log(creatorID, memberSpotifyIDs, playlistID);

  const memberIDs = await Promise.all(memberSpotifyIDs.map(async memberSpotifyID => {
    let user = await db.getUserBySpotifyUserID(memberSpotifyID);
    console.log('got user: ', user);
    if (user && user.id) {
      // user already exists
      return user.id;
    } else {
      // need to create new user
      user = await db.addUser(memberSpotifyID);
      console.log('got new user: ', user);
      return user.id;
    }
  }));

  const group = await db.createGroup(creatorID, playlistID);
  await db.addUsersToGroup([...memberIDs, creatorID], group.id);

  res.status(200).send({
    msg: 'OK'
  });
});

app.get('/api/user/:userID/groups', async (req, res) => {
  const userID = req.params.userID;
  const groups = await db.getGroupsForUser(userID);

  res.status(200).send({
    msg: 'OK',
    groups
  });
});

app.listen(3000,()=>
  console.log(`Server is listening on port 3000`)
);