type FooterItemType = {
  label: string;
  src: string;
  activeSrc: string;
  path: string;
};

export const footerItem: FooterItemType[] = [
  {
    label: "홈",
    src: "/icon/home.svg",
    activeSrc: "/icon/homeActive.svg",
    path: "/home",
  },
  {
    label: "하트박스",
    src: "/icon/heartBox.svg",
    activeSrc: "/icon/heartBoxActive.svg",
    path: "/home",
  },
  {
    label: "달력",
    src: "/icon/calendar.svg",
    activeSrc: "/icon/calendarActive.svg",
    path: "/home",
  },
  {
    label: "마이페이지",
    src: "/icon/my.svg",
    activeSrc: "/icon/myActive.svg",
    path: "/home",
  },
];
