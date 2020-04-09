import dayjs from "dayjs";
import countWords from "./countWords";

export default function saveAsTxt(text) {
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(
    blob,
    `Freewriter ${dayjs().format("YYYY-MM-DD")} - ${countWords(text)} words.txt`
  );
}
