// Mock data object used for LineChart and BarChart

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "sat", "Sun"],
  datasets: [
    {
      data: [20, 10, 4, 56, 87, 90, 22],
    },
  ],
};

// Mock data object used for Contribution Graph

const contributionData = [
  { date: "2023-09-01", count: 1 },
  { date: "2023-09-02", count: 2 },
  { date: "2023-09-03", count: 3 },
  { date: "2023-09-04", count: 4 },
  { date: "2023-09-05", count: 5 },
  { date: "2023-09-06", count: 2 },
  { date: "2023-09-31", count: 3 },
];

// Mock data object for Pie Chart

const pieChartData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

// Mock data object for Progress

const progressChartData = [0.4, 0.6, 0.8];

export { lineData, contributionData, pieChartData, progressChartData };
