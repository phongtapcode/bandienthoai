import { createReducer } from "@reduxjs/toolkit";
import { setUserInfor } from "./action";

const initialValue = {
    dataUser: {}
}

const Reducer = createReducer(initialValue,(builder)=>{
    builder
        .addCase(setUserInfor,(state,action)=>{
            state.dataUser.name = action.payload.name || "Phong Bá";
            state.dataUser.email = action.payload.email;
            state.dataUser.access_token = action.payload.access_token;
        })
})

export default Reducer;