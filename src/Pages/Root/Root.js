import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { Helmet } from "react-helmet";
import Footer from "../../Components/Footer/Footer";
import { LoadingBar } from "react-redux-loading-bar";
import { useEffect, useState } from "react";
import PreLoader from "../../Components/UI/PreLoader";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
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
      )}
    </>
  );
};
export default Root;
