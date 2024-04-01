import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponents/DefaultComponents";
import { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {

  // dùng react query
  // const fetchApi = async () => {
    // const res = await axios.get(
    //   `${import.meta.env.VITE_SOME_KEY_URL}/product/getAll`
    // );
    // return res.data;
  // };

  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  // console.log(query.data);

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
