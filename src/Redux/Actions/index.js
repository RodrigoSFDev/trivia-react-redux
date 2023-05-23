export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TIME_OUT = 'TIME_OUT';

export const login = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const timeOut = (payload) => ({
  type: TIME_OUT,
  payload,
});
