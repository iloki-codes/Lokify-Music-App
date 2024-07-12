import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import PlaylistSlice from "./playlistSlice";
import audioPlayer from "./audioPlayer";
import userSlice from "./userSlice";
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
    auth: authReducer,
    playlists: PlaylistSlice,
    audioPlayer: audioPlayer,
    user: userSlice
});

const persistConfig = {
    key : "root",
    storage,
    whitelist: ["auth", "audioPlayer"]
};

const persistReducer = persistReducer(persistConfig, reducers);

const store  = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

export default store;