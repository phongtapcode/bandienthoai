const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRoute")
const OrderRouter = require("./OrderRoute");

const routes = (app)=>{
    app.use("/api/user",UserRouter)
    app.use("/api/product",ProductRouter)
    app.use("/api/order",OrderRouter)
}

module.exports = routes