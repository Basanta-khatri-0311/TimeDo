export const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");

  if (hours === "00") {
    return `${minutes}:${seconds}:${milliseconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
};

export const formatDate = (iso) => {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};