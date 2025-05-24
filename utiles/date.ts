export const dayAndMonth = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${getOrdinalSuffix(day)} ${month}`;
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const formatFullDate = (date: Date): string => {
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const day = date.getDate();
  const suffix =
    day > 3 && day < 21 ? "th" : ["st", "nd", "rd"][(day % 10) - 1] || "th";

  const month = date.toLocaleString("default", { month: "short" });
  const weekday = date.toLocaleString("default", { weekday: "long" });

  return `${time}, ${day}${suffix} ${month}, ${weekday}`;
};

export const getTimeWithAmPm = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const convertPostgresDateTimeToJavascriptDateTime=(datatime:Date):Date=>{
  console.log("io: ",datatime);
  const temp=new Date(datatime);
  console.log("op: ",temp);
return new Date(datatime);
}

