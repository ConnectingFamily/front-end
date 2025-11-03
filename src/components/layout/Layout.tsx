const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-bg w-full max-w-[420px] min-h-screen mx-auto flex flex-col items-center justify-center">
    {children}
  </div>
);

export default Layout;
