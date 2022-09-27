import { DateTime } from "luxon";

export default function convertDateText(isoString: string) {
  const parsedMilliSeconds = DateTime.fromISO(isoString).toMillis();
  let substraction = DateTime.now().toMillis() - parsedMilliSeconds;

  substraction = substraction / 1000;
  if (substraction < 60) {
    return `${Math.floor(substraction)}초 전`;
  }

  substraction = substraction / 60;
  if (substraction < 60) {
    return `${Math.floor(substraction)}분 전`;
  }

  substraction = substraction / 60;
  if (substraction < 24) {
    return `${Math.floor(substraction)}시간 전`;
  }

  return DateTime.fromISO(isoString).toString().split("T")[0];
}
