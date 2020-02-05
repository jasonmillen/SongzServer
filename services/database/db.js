import { Model } from 'objection';
import Knex from 'knex';

import User from './model/user';
import Group from './model/group';
import UserGroup from './model/userGroup';

const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'jasonmillen',
    database: 'songshare'
  },
  pool: { min: 0, max: 10 }
});

Model.knex(knex);

export const getUserBySpotifyUserID = async (spotifyUserID) => {
  const user = await User.query()
    .select('id', 'spotifyuserid')
    .where('spotifyuserid', spotifyUserID)
    .first();

  return user;
};

export const addUser = async (spotifyUserID) => {
  const user = await User.query().insert({
    spotifyuserid: spotifyUserID
  });
  return user;
};

export const createGroup = async (creatorID, playlistID) => {
  const group = await Group.query().insert({
    creatorid: creatorID,
    playlistid: playlistID
  });
  console.log('created group', group);
  return group;
};

export const addUsersToGroup = async (userIDs, groupID) => {
  console.log("adding users ", userIDs, "to group id ", groupID);
  await Promise.all(
    userIDs.map(async userID => await UserGroup.query().insert({
      userid: userID,
      groupid: groupID
    }))
  );
};