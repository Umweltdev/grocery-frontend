import { PieChart } from "@mui/icons-material";

export const mockData = [
  {
    title: "Orders",
    data: {
      daily: {
        current: "£32,350",
        percentage: "25.25%",
        quantity: "1,520",
      },
      weekly: {
        current: "£15,800",
        percentage: "12.5%",
        quantity: "7,800",
      },
      monthly: {
        current: "£65,400",
        percentage: "15.0%",
        quantity: "35,100",
      },
      yearly: {
        current: "£500,000",
        percentage: "30.0%",
        quantity: "250,000",
      },
    },
    color: "#4E97FD",
  },
  {
    title: "Revenue",
    data: {
      daily: {
        current: "£2,350",
        percentage: "2.25%",
        quantity: "150",
      },
      weekly: {
        current: "£1,200",
        percentage: "1.5%",
        quantity: "750",
      },
      monthly: {
        current: "£15,000",
        percentage: "5.0%",
        quantity: "5,500",
      },
      yearly: {
        current: "£120,000",
        percentage: "10.0%",
        quantity: "45,000",
      },
    },
    color: "#E94560",
  },
];

export const staticData = [
  {
    title: "Product Share",
    current: "£2,350",
    Icon: PieChart,
    percentageChange: "2.25%",
    color: "green",
  },
];