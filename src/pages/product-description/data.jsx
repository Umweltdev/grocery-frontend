import { Box, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

export const itemArray = [
  {
    Icon: LocalShippingOutlinedIcon,
    title: "Fast Delivery",
    details: "Start from $10",
  },
  {
    Icon: ChatOutlinedIcon,
    title: "Feedback",
    details: "97% positive",
  },
  {
    title: " Payment",
    Icon: SecurityOutlinedIcon,
    details: "100% secured",
  },
  {
    Icon: QueryBuilderOutlinedIcon,
    title: "Refundable Policy",
    details: "Refunds Efficiently",
  },
];

export const item1Array = [
  {
    Icon: SupportAgentOutlinedIcon,
    title: "Return Policy",
    details: "(edit with the Customer Reassurance module)",
  },
  {
    Icon: LocalShippingOutlinedIcon,
    title: "Delivery policy",
    details: "(edit with the Customer Reassurance module)",
  },
  {
    Icon: LockPersonOutlinedIcon,
    title: "Security policy",
    details: "(edit with the Customer Reassurance module)",
  },
];

export const Item = ({ title, Icon, details }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      padding={{ xs: 1.5, sm: 2.5 }}
      sx={{
        display: "flex",
        gap: "10px",
        border: "1px solid #dee2e6",
        borderRadius: "10px",
        flexDirection: isNonMobile ? "row" : "column",
        alignItems: isNonMobile ? "start" : "center"
      }}
    >
      <Icon
        sx={{
          fontSize: isNonMobile ? "30px" : "2.4rem",
        }}
      />
      <Stack spacing={0.5}>
        <Typography variant="h6" fontSize={{ xs: "15px", sm: "18px" }} textAlign={{xs: "center", sm:"left"}}>
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          textAlign={{xs: "center", sm:"left"}}
          fontSize={{ xs: "12px", sm: "14px" }}
          color="text.secondary"
        >
          {details}
        </Typography>
      </Stack>
    </Box>
  );
};

export const Item1 = ({ title, Icon, details }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        border: "1px solid #dee2e6",
        padding: "15px",
        alignItems: "center",
      }}
    >
      <Icon />
      <Box>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">{details}</Typography>
      </Box>
    </Stack>
  );
};
