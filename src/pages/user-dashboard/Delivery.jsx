import { Typography, Box, Stack, Avatar } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Delivery = () => {
  return (
    <Box
      bgcolor="#fff"
      p={4}
      borderRadius={2}
      sx={{
        boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" my={4}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "64px",
            height: "64px",
          }}
        >
          <Inventory2Icon
            sx={{
              color: "white",
            }}
          />
        </Avatar>

        <Box
          height={{ xs: "50px", sm: "4px" }}
          flex={{ sm: "1 1 0" }}
          width={{ xs: "5px", sm: "auto" }}
          sx={{
            bgcolor: "primary.main",
            // width: "5px",
          }}
        />
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "64px",
            height: "64px",
          }}
        >
          <LocalShippingIcon
            sx={{
              color: "white",
            }}
          />
        </Avatar>
        <Box
          height={{ xs: "50px", sm: "4px" }}
          flex={{ sm: "1 1 0" }}
          width={{ xs: "5px", sm: "auto" }}
          sx={{
            bgcolor: "#DAE1E7",

            // width: "5px",
          }}
        />
        <Avatar
          sx={{
            bgcolor: "#DAE1E7",
            width: "64px",
            height: "64px",
          }}
        >
          <Inventory2Icon
            sx={{
              color: "primary.main",
            }}
          />
        </Avatar>
      </Stack>{" "}
      <Typography
        alignSelf={{ xs: "center", sm: "end" }}
        px={{ xs: 1.5, sm: 2 }}
        py={0.8}
        borderRadius="300px"
        bgcolor="#FCE9EC"
        color="primary.main"
        variant="subtitle2"
        fontSize={{ xs: "12px", sm: "14px" }}
      >
        Estimated Delivery Date <b>4th October</b>{" "}
      </Typography>
    </Box>
  );
};

export default Delivery;
