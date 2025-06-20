import { configureStore } from '@reduxjs/toolkit';
import companyReducer from "./slices/companySlice";
import { apiMiddleware } from './middleware/api';

const store = configureStore({
    reducer: {
        companyList: companyReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddleware)
       
})

export default store;
export type RootState = ReturnType<typeof store.getState>;