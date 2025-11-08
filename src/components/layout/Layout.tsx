import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideLayoutPages = [
    "/",
    "/login",
    "/onboard",
    "/onboard/join",
    "/onboard/join/confirm",
    "/onboard/create",
    "/onboard/create/complete",
    "/onboard/profile",
  ];
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <div className="bg-bg w-full max-w-[420px] min-h-screen mx-auto flex flex-col items-center">
      {!shouldHideLayout && <Header />}
      <div
        className={`w-full flex flex-1 overflow-y-auto ${
          !shouldHideLayout ? "pb-[52px]" : ""
        }`}
      >
        {children}
      </div>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
