import { useState } from "react";
import {
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  styled,
  Typography,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import SearchInput from "../forms/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { logout, resetState } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

const MobileHeader = ({
  handleCartOpen,
  handleClick,
  anchorEl,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      height: "15px",
      minWidth: "15px",
      backgroundColor: products?.length > 0 ? "#D23F57" : "transparent",
      padding: "0 6px",
      color: "white",
    },
  }));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(resetState());
    handleClose();
    navigate("/login");
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
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://res.cloudinary.com/dlst0is1v/image/upload/v1759063260/Gemini_Generated_Image_9a3gep9a3gep9a3g_1_qxkjji.png"
            alt="logo"
            style={{ height: "100px" }}
          />
        </Box>
      </Link>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ flex: "1 1 0%", justifyContent: "end" }}
      >
        <IconButton
          component="span"
          onClick={handleDrawerOpen}
          sx={{
            color: "black",
            transition: "none !important",
            "& .MuiTouchRipple-root": { display: "none" },
          }}
        >
          <SearchIcon />
        </IconButton>
        <div>
          <IconButton sx={{ color: "black" }} onClick={handleClick}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{
              marginTop: "10px",
              "& .MuiList-root": { width: "200px" },
            }}
          >
            {user && (
              <Link
                to="/user/profile"
                style={{ textDecoration: "none", color: "#2b3445" }}
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
              <MenuItem onClick={handleLogoutClick}>
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
        <IconButton onClick={handleCartOpen} sx={{ color: "black" }}>
          <StyledBadge
            badgeContent={products?.reduce(
              (sum, product) => sum + (product.count || 0),
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
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": { backgroundColor: "white" },
        }}
      >
        <Box sx={{ width: "auto", padding: "20px", height: "100vh" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Search Bazaar</Typography>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ color: "rgba(0, 0, 0, 0.54)" }}
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

MobileHeader.propTypes = {
  handleCartOpen: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  handleClose: PropTypes.func.isRequired,
};

export default MobileHeader;
