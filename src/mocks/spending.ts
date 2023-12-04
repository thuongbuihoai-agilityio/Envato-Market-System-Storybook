export const TOTAL_EARNINGS_MOCK = {
  title: 'Total earnings',
  total: 7.245,
  growth: 3.5,
  weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
};

export const SPENDING_STATISTICS_MOCK = [
  TOTAL_EARNINGS_MOCK,
  {
    title: 'Total Spending',
    total: 7.245,
    growth: 3.5,
    weeklyIncome: [20, 40, 60, 80, 90, 110, 130],
  },
  {
    title: 'Spending Goal',
    total: 7.245,
    growth: 3.5,
    weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
  },
];

export const EFFICIENCY_MOCK = {
  arrival: 5.23,
  spending: 6.23,
  statistical: [
    {
      title: 'Goal',
      value: 50,
    },
    {
      title: 'Spending',
      value: 30,
    },
    {
      title: 'Others',
      value: 20,
    },
  ],
};