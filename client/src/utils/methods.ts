const getRemainingdays: (endDate: string) => number = (endDate: string) => {
  let endingDate: Date = new Date(endDate);
  let today: Date = new Date();
  return Math.abs(endingDate.getDate() - today.getDate());
};

export default getRemainingdays;

/**
 * get today date
 */
export const today = (): string => new Date().toISOString().split("T")[0];
