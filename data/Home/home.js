import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { contributionData, lineData } from "components/Charts/data";

export const justForYouData = [
  { name: "Attend a Mosque", uri: require("../../assets/AttendMosqueFY.png") },
  {
    name: "Supplicate with Dua",
    uri: require("../../assets/MakeDuaFY.png"),
  },
  { name: "Read Quran", uri: require("../../assets/ReadQuranFY.png") },
  { name: "Fasting today?", uri: require("../../assets/FastFY.png") },
];

export const MyListData = [
  { title: "Hadith", uri: require("../../assets/AlQuranBook2.png") },
  { title: "Charity", uri: require("../../assets/CharityBox3.png") },
  { title: "Thikr", uri: require("../../assets/PrayerBeads.png") },
  { title: "Dua", uri: require("../../assets/DuaBook2.png") },
  { title: "Educate", uri: require("../../assets/WashingHands2.png") },
  { title: "Pilgrimage", uri: require("../../assets/Kaaba3.png") },
  { title: "Fasting", uri: require("../../assets/DateFruit.png") },
  { title: "Quran", uri: require("../../assets/AlQuranBookRead4.png") },
  { title: "Prayer", uri: require("../../assets/PrayerRugCarpet3.png") },
];

export const IconicUnmissableData = [
  {
    name: "Attend a Mosque",
    author: "hossam sulleman",
    type: "Arabic recitation + english translation",
    uri: require("../../assets/QuranCover.png"),
  },
];

export const TalkingAboutData = [
  {
    uri: require("../../assets/Books.png"),
    chart: (
      <ContributionGraph
        values={contributionData}
        endDate={new Date("2023-09-18T18:20:55.000Z")}
        numDays={62}
        width={350}
        height={220}
        style={{ borderRadius: "10" }}
        chartConfig={{
          backgroundGradientFrom: "#C1E282",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    ),
  },
  {
    uri: require("../../assets/PrayerBeads.png"),
    chart: (
      <ContributionGraph
        values={contributionData}
        endDate={new Date("2023-09-18T18:20:55.000Z")}
        numDays={62}
        width={350}
        height={220}
        style={{ borderRadius: "10" }}
        chartConfig={{
          backgroundGradientFrom: "#C1E282",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    ),
  },
  {
    uri: require("../../assets/PrayerRugCarpet3.png"),
    chart: (
      <ContributionGraph
        values={contributionData}
        endDate={new Date("2023-09-18T18:20:55.000Z")}
        numDays={62}
        width={350}
        height={220}
        style={{ borderRadius: "10" }}
        chartConfig={{
          backgroundGradientFrom: "#C1E282",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    ),
  },
  {
    uri: require("../../assets/AlQuranBookRead4.png"),
    chart: (
      <ContributionGraph
        values={contributionData}
        endDate={new Date("2023-09-18T18:20:55.000Z")}
        numDays={62}
        width={350}
        height={220}
        style={{ borderRadius: "10" }}
        chartConfig={{
          backgroundGradientFrom: "#C1E282",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    ),
  },
];
