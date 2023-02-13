import { 
  LOGINUSERID
} from "../actions/type";

const INITIAL_STATE = {
  LoginUser : {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGINUSERID:
      return {
        ...state,
        LoginUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
