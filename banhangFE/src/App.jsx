import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponents/DefaultComponents";
import { Fragment, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService"
import { setUserInfor } from "./redux/action";
import { useDispatch } from "react-redux";
import { isJsonString } from "./utils";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const {decoded,storageData} = handleDecoded();
      if(decoded?.id){
        handleGetDetailUser(decoded?.id,storageData);
      }
  },[])

  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const {decoded,storageData} = handleDecoded();
    const currentTime = new Date();
    
    if(decoded?.exp < currentTime.getTime()/1000){
      // nếu thời gian hết hạn token < thời gian thực tính theo ms
      const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }

    return {decoded,storageData};
  }

  const handleGetDetailUser = async (id,access_token)=>{
    const res = await UserService.getDetailsUser(id,access_token);
    dispatch(setUserInfor({...res?.data,access_token: access_token}));
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, i) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                key={i}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
