export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TIME_OUT = 'TIME_OUT';
export const GET_SCORE = 'GET_SCORE';
export const SAVE_ASSERT = 'SAVE_ASSERT';

export const login = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERT,
  payload,
});
