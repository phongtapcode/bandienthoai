import { createReducer } from "@reduxjs/toolkit";
import { setUserInfor,resetUser, valueSearch } from "./action";

const initialValue = {
    dataUser: {
        id: "",
        name: "",
        email: "",
        phone: "",
        access_token: "",
        address: "",
        avatar: "",
        isAdmin: false
    },
    valueSearch: "",
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
            state.dataUser.isAdmin = action.payload.isAdmin;
        })
        .addCase(resetUser,(state)=>{
            state.dataUser.id = "";
            state.dataUser.name = "";
            state.dataUser.email = "";
            state.dataUser.access_token = "";
            state.dataUser.address = "";
            state.dataUser.phone = "";
            state.dataUser.avatar = "";
            state.dataUser.isAdmin = false;
        })
        .addCase(valueSearch,(state,action)=>{
            state.valueSearch = action.payload;
        })
})

export default Reducer;