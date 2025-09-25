import { ReactComponent as BarChart } from "../../assets/icons/barchart.svg";
import { ReactComponent as Pie } from "../../assets/icons/piechart.svg";
import { ReactComponent as Rainbow } from "../../assets/icons/rainbow.svg";
import { ReactComponent as Cloud } from "../../assets/icons/cloud.svg";
export const mockData = [
    {
      name: "Order",
      amount: "32,350",
      amount1: "9345",
      percentage: "25.25%",
      color: "#4E97FD",
    },
    {
      name: "Sold Items",
      amount: "2,350",
      amount1: "9345",
      percentage: "2.25%",
      color: "#E94560",
    },
    {
      name: "Gross Sales",
      amount: "$6,350",
      amount1: "9345",
      percentage: "22.25%",
      color: "rgb(51, 208, 103)",
    },
    {
      name: "Total Shipping",
      amount: "$23,350",
      amount1: "9345",
      percentage: "15.25%",
      color: "#E94560",
    },
  ];
  
  export const mockData2 = [
    {
      name: "Weekly Sales",
      amount: "32,350",
  
      percentage: "25.25%",
      Icon: BarChart,
    },
    {
      name: "Product Share",
      amount: "$2,350",
      Icon: Pie,
      percentage: "2.25%",
    },
    {
      name: "Total Order",
      amount: "$62,350",
      Icon: Cloud,
      percentage: "2.25%",
    },
    {
      name: "Market Share",
      amount: "$32,350",
      Icon: Rainbow,
      percentage: "2.25%",
    },
  ];
  