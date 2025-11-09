import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-row justify-between items-center h-[44px] px-[20px] py-[10px]">
      {/* logo */}
      <img
        src="/icon/logo.webp"
        alt="logo"
        onClick={() => navigate("/home")}
        className="w-[85px] h-[18px]"
      />

      {/* noti & hamburger */}
      <div className="flex flex-row gap-x-2">
        <img
          src="/icon/notification.svg"
          alt="notiIcon"
          width="24px"
          onClick={() => navigate("/noti")}
        />
        <img
          src="/icon/hamburger.svg"
          alt="menuIcon"
          width="24px"
          onClick={() => navigate("/menu")}
        />
      </div>
    </div>
  );
};

export default Header;
