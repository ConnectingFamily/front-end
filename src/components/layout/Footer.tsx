import { useLocation } from "react-router-dom";
import { footerItem } from "../../constants/layout";

const Footer = () => {
  return (
    <div className="w-full flex flex-row justify-between h-[52px] px-[20px] py-[10px] shadow-[0_-4px_8px_rgba(0,0,0,0.08)]">
      {/* footer item map */}
      <div className="w-full grid grid-cols-4 col-span-4">
        {footerItem.map((item) => {
          const location = useLocation();
          const path = location.pathname;
          const isActive = path === item.path;

          return (
            <div className="flex flex-col items-center" key={item.label}>
              <img
                src={isActive ? item.activeSrc : item.src}
                alt={item.label}
                width="32px"
                height="32px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
