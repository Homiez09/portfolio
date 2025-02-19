export const timeFormat = (date: string) => {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  const hr = d.getHours();
  const min = d.getMinutes();
  return `${day}-${month}-${year} (${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")})`;
};

export const timeCardFormat = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();

  return `${month} ${day}, ${year}`;
};
