type LevelItemType = {
  src: string;
  title: string;
};
export const LevelItem: LevelItemType[] = [
  { src: "/image/level_1.png", title: "Lv1. 낯선 마음" },
];

type FamilyAnsSituationType = {
  role: string;
  completed: boolean;
};

export const FamilyAnsSituation: FamilyAnsSituationType[] = [
  { role: "엄마", completed: true },
  { role: "나", completed: false },
  { role: "아빠", completed: false },
  { role: "동생", completed: false },
];

type TodayMissionType = {
  title: string;
  desc: string;
};

export const TodayMission: TodayMissionType[] = [
  {
    title: "긍정적인 소통하기 ",
    desc: "부정적인 언어는 NO! <br/>긍정적으로 표현하고 대화하는 법을 알려드릴게요!",
  },
  {
    title: "마음을 여는 표현 한 가지",
    desc: "서로에게 고마웠던 일 한 가지를 떠올려보고, <br/>고마운 마음을 표현해보세요",
  },
  {
    title: "온전하게 경청하기",
    desc: "상대방의 이야기를 끊지 않고, <br/>눈을 마주치며 고개를 끄덕여 온전히 들어주세요.",
  },
  {
    title: "진심 담아 칭찬하기",
    desc: "가족 구성원 중 한 명의 장점이나 잘한 일에 대해 <br/>구체적으로 언급하며 칭찬해 보세요.",
  },
];
