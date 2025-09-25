import { useState } from "react";
import {
  Box,
  Stack,
  Menu,
  MenuItem,
  Container,
  IconButton,
  Badge,
  styled,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import SearchInput from "../forms/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { logout, resetState } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const MobileHeader = ({
  handleCartOpen,
  handleClick,
  anchorEl,
  handleLogout,
  handleClose,
}) => {
  const { products } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      height: "15px",
      minWidth: "15px",
      backgroundColor: products.length > 0 ? "#D23F57" : "transparent",
      padding: "0 6px",
      color: "white",
    },
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      pt={0.8}
      p={1}
      justifyContent="space-between"
      display={{ xs: "flex", lg: "none" }}
    >
      {/* <Box
        sx={{
          flex: "1 1 0%",
        }}
      >
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box> */}

      <Link to="/" style={{ display: "flex" }}>
        {/* <Box height="40px" width="auto"> */}
        <img
          src="https://bazaar.ui-lib.com/assets/images/logo2.svg"
          // width="100%"
          // height="100%"
        />
        {/* </Box> */}
      </Link>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          flex: "1 1 0%",
          justifyContent: "end",
        }}
      >
        <IconButton
          component="span"
          onClick={handleDrawerOpen}
          sx={{
            color: "black",
            transition: "none !important",
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
        <div>
          <IconButton
            sx={{
              color: "black",
            }}
            onClick={handleClick}
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              marginTop: "10px",
              "& .MuiList-root": {
                width: "200px",
              },
            }}
          >
            <Link
              to="/user/profile"
              style={{
                textDecoration: "none",
                color: "#2b3445",
              }}
            >
              {user && (
                <MenuItem onClick={handleClose}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PersonAdd fontSize="small" />
                    <Typography>My Dashbord</Typography>
                  </Stack>
                </MenuItem>
              )}
            </Link>

            {user ? (
              <MenuItem onClick={handleLogout}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LogoutIcon fontSize="small" />
                  <Typography>Logout</Typography>
                </Stack>{" "}
              </MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/login")}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LoginIcon fontSize="small" />
                  <Typography>Login</Typography>
                </Stack>{" "}
              </MenuItem>
            )}
          </Menu>
        </div>

        <IconButton
          onClick={handleCartOpen}
          sx={{
            color: "black",
          }}
        >
          <StyledBadge
            badgeContent={products.reduce(
              (sum, product) => sum + product.count,
              0
            )}
          >
            <ShoppingBagOutlinedIcon />
          </StyledBadge>
        </IconButton>
      </Stack>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="top"
        bgcolor="white"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "white",
          },
        }}
      >
        <Box
          sx={{
            width: "auto",
            padding: "20px",
            height: "100vh",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Search Bazaar</Typography>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "rgba(0, 0, 0, 0.54)",
              }}
            >
              <ClearIcon />
            </IconButton>
          </Stack>
          <Box
            sx={{
              position: "relative",

              maxWidth: "670px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <SearchInput
              drawerOpen={drawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          </Box>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default MobileHeader;
