import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-row justify-between h-[44px] px-[20px] py-[10px]">
      {/* logo */}
      <div
        className="font-aggro text-[#FE7171] font-black text-xl"
        onClick={() => navigate("/home")}
      >
        이심전심
      </div>

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
