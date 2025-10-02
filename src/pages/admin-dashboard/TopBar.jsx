import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const TopBar = ({ handleDrawerOpen }) => {
  const bigScreen = useMediaQuery("(min-width:1230px)");
  const { user } = useSelector((state) => state.auth);

  return (
    <Box
      bgcolor="white"
      p={2}
      px={{ xs: 1.5, sm: 4 }}
      sx={{
        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={{ xs: 2, lg: 0 }} alignItems="center">
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              background: "#F6F9FC",
              display: bigScreen ? "none" : "inline-flex",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            sx={{
              textTransform: "none",
              bgcolor: "background.paper",
              py: "9px",
              px: "20px",
              borderRadius: "8px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "background.paper",
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TravelExploreIcon sx={{ fontSize: 25, color: "primary.main" }} />
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" color="primary.main">
                  Browse Website
                </Typography>
              </Link>
            </Stack>
          </Button>
        </Stack>
        <Stack
          direction="row"
          spacing={{ xs: 1.5, sm: 2.5 }}
          alignItems="center"
        >
          <NotificationsIcon
            sx={{ fontSize: 35, color: "primary.contrastText" }}
          />

          <Box sx={{ width: 35, height: 35 }}>
            <Avatar
              src={user?.image}
              alt={user?.name || "User Avatar"}
              sx={{ width: 35, height: 35 }}
            >
              {!user?.image && user?.name?.[0]?.toUpperCase()}
            </Avatar>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

TopBar.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default TopBar;
