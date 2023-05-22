import { PLAYER_LOGIN } from '../Actions';

const INICIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default player;
