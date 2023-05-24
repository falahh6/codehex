import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { Helmet } from "react-helmet";
import Footer from "../../Components/Footer/Footer";
import { LoadingBar } from "react-redux-loading-bar";

const Root = () => {
  return (
    <>
      <Helmet>
        <title>codehex</title>
      </Helmet>
      <Header />
      <LoadingBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Root;
