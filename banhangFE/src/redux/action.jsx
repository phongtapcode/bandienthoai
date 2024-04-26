import { createAction } from "@reduxjs/toolkit";

const setUserInfor = createAction("setUserInfor");
const resetUser = createAction("resetUser");
const valueSearch = createAction("valueSearch");

export {
    setUserInfor,
    resetUser,
    valueSearch
}