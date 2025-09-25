import {
  Box,
  Stack,
  Button,
  SvgIcon,
  Container,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as Browse } from "../../assets/icons/browse.svg";
import { ReactComponent as Bell } from "../../assets/icons/bell.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

const TopBar = ({ handleDrawerOpen }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const bigScreen = useMediaQuery("(min-width:1230px)");

  const { user } = useSelector((state) => state.auth);

  return (
    <Box
      bgcolor="white"
      p={2}
      px={{ xs: 1.5, sm: 4 }}
      sx={{
        boxShadow: " 0px 4px 16px rgba(43, 52, 69, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={{ xs: 2, lg: 0 }}>
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
              paddingY: "9px",
              paddingX: "20px",
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
                  color: "text.primary",
                }}
              >
                <Browse />
              </SvgIcon>

              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" color="text.primary">
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
          {/* <OutlinedInput
            placeholder="Search anything"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              borderRadius: "12px",
              paddingRight: 0,
              bgcolor: "background.paper",

              "& .MuiInputBase-input": {
                padding: "10px",
                fontSize: "14px",
              },
            }}
          /> */}

          <SvgIcon
            sx={{
              fontSize: "25px",
              color: "primary.contrastText",
            }}
          >
            <Bell />
          </SvgIcon>
          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <img
              src={user?.image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopBar;
