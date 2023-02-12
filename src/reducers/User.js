import { USERDATA } from "../actions/type";

const INITIAL_STATE = {
  User : {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERDATA:
      return {
        ...state,
        User: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
