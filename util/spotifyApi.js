import { encode as btoa } from 'base-64';
import fetch from 'node-fetch';

export const getTokens = async (authorizationCode, credentials) => {
  let tokenData;
  try {
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
      }`,
    });

    const responseJson = await response.json();

    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    // set user data accessToken
    // set user data refreshToken
    // set user data expirationTime
    tokenData = {
      accessToken,
      refreshToken,
      expirationTime
    };
  }
  catch (err) {
    console.error(err);
  }

  return tokenData;
};

export const refreshToken = async (refreshToken, credentials) => {
  let tokenData;
  try {
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    //const refreshToken = await getUserData('refreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      // error
    } 
    else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      tokenData.accessToken = newAccessToken;
      tokenData.refreshToken = newRefreshToken;
      tokenData.expirationTime = expirationTime;
    } 
  }
  catch (err) {
    console.error(err)
  }
  return tokenData;
};