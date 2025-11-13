import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import { updateProfile } from "../api/user";
import plus from "../../public/icon/plus.svg";

const OnboardProfile = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_NICKNAME_LENGTH = 5;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = async () => {
    if (!nickname.trim() && !profileImage) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const updateRequest: { nickname?: string; profileImageUrl?: string } = {};
      
      if (nickname.trim()) {
        updateRequest.nickname = nickname.trim();
      }
      
      if (profileImage) {
        updateRequest.profileImageUrl = profileImage;
      }

      await updateProfile(updateRequest);

      navigate("/home");
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || "프로필 저장 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = nickname.trim().length > 0;

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader />

      <div className="flex-1 flex flex-col items-center px-[20px] pt-[7.1vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-y-[8px] mb-[4.73vh]">
          <div className="title text-text text-center">나를 소개해볼까요?</div>
          <div className="label text-text text-center">
            가족에게 보여줄 나의 프로필을 완성해주세요.
          </div>
        </div>

        <div className="mb-[2.36vh]">
          <div
            onClick={handleImageClick}
            className="w-[30.77vw] h-[30.77vw] max-w-[120px] max-h-[120px] rounded-[16px] bg-outline flex items-center justify-center"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-full h-full rounded-[6px] object-cover"
              />
            ) : (
              <img src={plus} alt="plus" className="w-[32px] h-[32px]" />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="w-full max-w-[350px]">
          <div className="label-bold text-text mb-[12px]">닉네임</div>
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_NICKNAME_LENGTH) {
                  setNickname(value);
                }
              }}
              placeholder="닉네임을 입력해주세요"
              className="w-full h-11 px-3 pr-12 border border-outline rounded body bg-bg focus:outline-none"
              maxLength={MAX_NICKNAME_LENGTH}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 caption text-sub-text">
              {nickname.length}/{MAX_NICKNAME_LENGTH}
            </div>
          </div>
          {error && (
            <div className="mt-2 body text-error">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton
            label={isFormValid ? "다음" : "완료"}
            onClick={handleComplete}
            disabled={(!isFormValid && !profileImage) || isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardProfile;

