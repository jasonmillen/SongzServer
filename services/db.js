import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'jasonmillen',
  database: 'songshare',
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0
});

export const getUserBySpotifyUserID = async (spotifyUserID) => {
  const result = await pool.query('SELECT id, spotifyuserid FROM users');
  console.log(result.rows);
  return result.rows[0];
};

export const addUser = async (spotifyUserID) => {
  const queryText = `
    INSERT INTO users (spotifyuserid)
    VALUES ($1)`
  const queryParams = [spotifyUserID];
  const result = await pool.query(queryText, queryParams);
};