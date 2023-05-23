import { TIME_OUT } from '../Actions';

const INICIAL_STATE = {
  disabled: false,
};

const timeOut = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case TIME_OUT:
    return {
      disabled: action.payload,
    };
  default:
    return state;
  }
};

export default timeOut;
