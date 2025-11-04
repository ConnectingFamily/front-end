const Header = () => {
  return (
    <div className="w-full flex flex-row justify-between h-[44px] px-5 py-2">
      {/* logo */}
      <div className="font-aggro text-[#FE7171] font-black text-xl">
        이심전심
      </div>

      {/* noti & hamburger */}
      <div className="flex flex-row gap-x-2">
        <img src="/icon/notification.svg" alt="notiIcon" width="24px" />
        <img src="/icon/hamburger.svg" alt="menuIcon" width="24px" />
      </div>
    </div>
  );
};

export default Header;
