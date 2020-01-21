import express from 'express';

import { 
  getTokens,
  refreshTokens
 } from './util/spotifyApi';

 import {
  getUserBySpotifyUserID,
  addUser,
  createGroup,
  addUsersToGroup
 } from './services/database/db';
import { create } from 'domain';

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
  let user = await getUserBySpotifyUserID(spotifyUserID);
  if (!user) {
    console.log('user not found');
    user = {};
  }
  res.send(user);
});

app.post('/api/user/create', async (req, res) => {
  const spotifyUserID = req.body.spotifyUserID;
  console.log('got spotify user id', spotifyUserID);
  await addUser(spotifyUserID);
  res.status(200).send({
    msg: 'OK'
  });
});

app.post('/api/group/create', async (req, res) => {
  const creatorID = req.body.creatorID;
  const memberIDs = req.body.memberIDs;
  const playlistID = req.body.playlistID;

  const group = await createGroup(creatorID, playlistID);
  await addUsersToGroup(memberIDs, group.id);

  res.status(200).send({
    msg: 'OK'
  });
});

app.listen(3000,()=>
  console.log(`Server is listening on port 3000`)
);