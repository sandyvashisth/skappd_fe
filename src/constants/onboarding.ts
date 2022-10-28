export type TStep = {
  id: string;
  title: string;
  status: null | string;
  active: boolean;
  approxCompletionTime: number;
};

export type TprogressStatus = {
  totalTime: number;
  remainingTime: number;
  progressPercent: number;
};
