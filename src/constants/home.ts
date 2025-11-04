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
    title: "배너 영역 ",
    desc: "ex).오늘은 서로에게 ‘고맙다’고 먼저 말해보세요",
  },
  {
    title: "배너 영역 ",
    desc: "ex).오늘은 서로에게 ‘고맙다’고 먼저 말해보세요",
  },
  {
    title: "배너 영역 ",
    desc: "ex).오늘은 서로에게 ‘고맙다’고 먼저 말해보세요",
  },
  {
    title: "배너 영역 ",
    desc: "ex).오늘은 서로에게 ‘고맙다’고 먼저 말해보세요",
  },
];
