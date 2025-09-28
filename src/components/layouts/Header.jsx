import { useState } from "react";
import {
  Box,
  Stack,
  Container,
  IconButton,
  Badge,
  styled,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Cart from "./Cart";
import MobileHeader from "./MobileHeader";
import SearchInput from "../forms/SearchInput";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: "-7px",
      top: "-7px",
      backgroundColor: products.length > 0 ? "#D23F57" : "transparent",
      padding: "0 6px",
      color: "white",
    },
  }));

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        zIndex: 50,
        position: "sticky",
        top: 0,
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height={{ xs: 50, md: 72 }}
          spacing={2}
          display={{ xs: "none", lg: "flex" }}
        >
          <Link to="/">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759089277/Gemini_Generated_Image_9a3gep9a3gep9a3g__1_-removebg-preview_lmwpfj.png"
                alt="logo"
                style={{ height: "100px" }}
              />
            </Box>
          </Link>
          <Box sx={{ flex: 1, maxWidth: "670px" }}>
            <SearchInput />
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={handleCartOpen}
              sx={{
                bgcolor: "#F3F5F9",
                color: "rgba(0, 0, 0, 0.54)",
                width: 50,
                height: 50,
              }}
            >
              <StyledBadge
                badgeContent={products.reduce(
                  (sum, product) => sum + product.count,
                  0
                )}
              >
                <ShoppingCartOutlinedIcon />
              </StyledBadge>
            </IconButton>
            <div>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  sx={{
                    bgcolor: "#F3F5F9",
                    color: "rgba(0, 0, 0, 0.54)",
                    width: 50,
                    height: 50,
                  }}
                  onClick={handleClick}
                >
                  <PersonOutlineOutlinedIcon />
                </IconButton>
                {user && (
                  <Typography
                    fontSize="18px"
                    fontWeight={700}
                    textTransform="capitalize"
                    color="#D23F57"
                  >
                    Hi, {user?.fullName?.split(" ")[0] || "User"}
                  </Typography>
                )}
              </Stack>
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
                    width: 200,
                  },
                }}
              >
                {user && (
                  <Link
                    to="/user/profile"
                    style={{
                      textDecoration: "none",
                      color: "#2b3445",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <PersonAdd fontSize="small" />
                        <Typography>My Dashboard</Typography>
                      </Stack>
                    </MenuItem>
                  </Link>
                )}

                {user ? (
                  <MenuItem onClick={handleLogout}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <LogoutIcon fontSize="small" />
                      <Typography>Logout</Typography>
                    </Stack>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/login")}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <LoginIcon fontSize="small" />
                      <Typography>Login</Typography>
                    </Stack>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </Stack>
        </Stack>

        <MobileHeader
          handleCartOpen={handleCartOpen}
          handleClick={handleClick}
          handleClose={handleClose}
          handleLogout={handleLogout}
          anchorEl={anchorEl}
        />
      </Container>
      <Cart open={cartOpen} onClose={handleCartClose} />
    </Box>
  );
};

export default Header;
