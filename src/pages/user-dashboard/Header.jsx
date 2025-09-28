import { Typography, Stack, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

const DashboardHeader = ({ title, button, openDrawer,}) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const marginBottom = button ? { xs: 1.5, md: 0 } : 0;

  return (
    <Box
      sx={{
        mb: 4,
        pb: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "flex-start", md: "center" }}
          alignItems="center"
          width="100%"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mb={marginBottom}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "primary.50",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            </Box>
            <Typography
              variant="h4"
              color="primary.main"
              fontWeight={700}
              p="2"
              fontSize={{ xs: "28px", md: "32px" }}
              textAlign={{ xs: "left", md: "center" }}
              sx={{ width: "100%" }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>

        <IconButton
          onClick={openDrawer}
          sx={{
            display: isNonMobile ? "none" : "inline-flex",
            bgcolor: "grey.100",
            "&:hover": {
              bgcolor: "grey.200",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.node,
  link: PropTypes.string,
  openDrawer: PropTypes.func.isRequired,
  Icon: PropTypes.node,
};

export default DashboardHeader;
