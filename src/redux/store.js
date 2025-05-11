import { configureStore} from "@reduxjs/toolkit";

import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";

import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./rootReducer";
import { PERSIST } from "redux-persist";
const persistConfig = {
    key: 'ePortfolio',
    storage,
    whitelist:["auth"]
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleWare) => {
        return getDefaultMiddleWare({
          serializableCheck: {
            ignoreActions: [PERSIST],
          },
        });
      },
  
})
const persistor = persistStore(store)
export  {store,persistor};