import emojiThx from "../../public/icon/emojiThx.svg";
import emojiSry from "../../public/icon/emojiSry.svg";
import emojiLuv from "../../public/icon/emojiLuv.svg";
import emojiBest from "../../public/icon/emojiBest.svg";
import emojiOk from "../../public/icon/emojiOk.svg";
import emojiUnderstand from "../../public/icon/emojiUnderstand.svg";
import type { Emoji } from "../types/daily-question";

export const EMOJI_LIST: Emoji[] = [
  { id: "thx", label: "고마워요", src: emojiThx },
  { id: "sry", label: "미안해요..", src: emojiSry },
  { id: "luv", label: "사랑해요", src: emojiLuv },
  { id: "best", label: "최고예요!", src: emojiBest },
  { id: "ok", label: "괜찮아요", src: emojiOk },
  { id: "understand", label: "이해해요", src: emojiUnderstand },
];

