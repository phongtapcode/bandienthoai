import { createReducer } from "@reduxjs/toolkit";
import { setUserInfor,resetUser } from "./action";

const initialValue = {
    dataUser: {
        id: "",
        name: "",
        email: "",
        phone: "",
        access_token: "",
        address: "",
        avatar: ""
    },

}

const Reducer = createReducer(initialValue,(builder)=>{
    builder
        .addCase(setUserInfor,(state,action)=>{
            state.dataUser.id = action.payload._id;
            state.dataUser.name = action.payload.name || "Phong Bá";
            state.dataUser.email = action.payload.email;
            state.dataUser.address = action.payload.address;
            state.dataUser.phone = action.payload.phone;
            state.dataUser.avatar = action.payload.avatar;
            state.dataUser.access_token = action.payload.access_token;
        })
        .addCase(resetUser,(state)=>{
            state.dataUser.name = "";
            state.dataUser.email = "";
            state.dataUser.access_token = "";
        })
})

export default Reducer;