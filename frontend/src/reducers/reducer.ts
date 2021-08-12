import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = (state = { consents: [] }, action) => {
  switch (action.type) {
    case "consent/add": {
      return { consents: [...state.consents, action.payload] };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

export default persistReducer(persistConfig, rootReducer);
