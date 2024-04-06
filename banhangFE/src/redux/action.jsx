import { createAction } from "@reduxjs/toolkit";

const setUserInfor = createAction("setUserInfor");
const resetUser = createAction("resetUser");

export {
    setUserInfor,
    resetUser
}