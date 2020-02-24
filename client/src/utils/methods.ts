export const getRemainingdays: (endDate: string) => number = (
  endDate: string
) => {
  let endingDate: Date = new Date(endDate);
  let today: Date = new Date();
  return Math.abs(endingDate.getDate() - today.getDate());
};
