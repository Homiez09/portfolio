export const timeFormat = (date: string) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    const hr = d.getHours();
    const min = d.getMinutes();
    return `${day}-${month}-${year} (${hr}:${min})`;
}

export const timeCardFormat = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();

    return `${month} ${day}, ${year}`;
}