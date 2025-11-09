import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const label = { inputProps: { "aria-label": "noti switch" } };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-[40px] p-5">
      {/* profile box */}
      <div className="flex flex-col gap-y-[12px]">
        <div className="body-bold">내 프로필</div>
        <div className="px-2 flex flex-row gap-x-[16px]">
          <div className="bg-black/8 rounded-[12px] w-[76px] h-[76px]" />
          <div className="flex flex-col flex-1 gap-y-[8px]">
            <div className="flex flex-row justify-between">
              <div className="bg-[#FAE100] py-1 px-2 caption w-fit">카카오</div>
              <div className="bg-sub-1 py-1 px-2 caption w-fit shadow-[2px_2px_2px_rgba(0,0,0,0.12)]">
                편집
              </div>
            </div>

            <div className="label-bold">닉네임</div>
            <div className="label text-sub-text body">hrinni01@gmail.com</div>
          </div>
        </div>
      </div>

      {/* notification setting */}
      <div className="flex flex-col gap-y-[12px]">
        <div className="body-bold">알림 설정</div>
        <div className="px-2 flex flex-row justify-between items-center">
          <div className="label">알림 허용</div>
          <Switch {...label} defaultChecked color="default" />
        </div>
      </div>

      {/* my account */}
      <div className="flex flex-col gap-y-[12px]">
        <div className="body-bold">내 계정</div>
        <div className="label">도움말</div>
        <div className="label" onClick={() => navigate("/")}>
          로그아웃
        </div>
        <div className="label">계정 탈퇴</div>
      </div>
    </div>
  );
};

export default Profile;
