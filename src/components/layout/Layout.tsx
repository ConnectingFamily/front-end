import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-bg w-full max-w-[420px] min-h-screen mx-auto flex flex-col items-center">
    <Header />
    <div className="w-full flex flex-1 pb-[52px] overflow-y-auto">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
