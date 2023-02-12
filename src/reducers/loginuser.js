import { 
  LOGINUSERID,
  ENABLEEDIT
} from "../actions/type";

const INITIAL_STATE = {
  LoginUser : {},
  editPermission: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGINUSERID:
      return {
        ...state,
        LoginUser: action.payload,
      };
    case ENABLEEDIT:
      return {
        ...state,
        editPermission: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
