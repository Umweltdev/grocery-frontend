import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Button,
  SvgIcon,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Browse from "../../assets/icons/browse.svg?component";
import Bell from "../../assets/icons/bell.svg?component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

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
              <SvgIcon
                sx={{
                  fontSize: "25px",
                  color: "primary.main",
                }}
                component={Browse}
              />
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
          <SvgIcon
            sx={{
              fontSize: "25px",
              color: "primary.contrastText",
            }}
            component={Bell}
          />

          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <img
              src={user?.image || "/default-avatar.png"}
              alt="User Avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
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
