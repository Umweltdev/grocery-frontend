import { useEffect } from "react";
import { Typography, Box, Stack, Button, Link as MuiLink } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  resetState,
  getWishList,
  getOrders,
  getCards,
} from "../../features/auth/authSlice";
import { getAddresses } from "../../features/address/addressSlice";

const ILink = ({ text, no, Icon, url, closeDrawer }) => {
  const location = useLocation();
  const isActive =
    location.pathname === `/user/${url}` ||
    location.pathname.startsWith(`/user/${url}/`);
  return (
    <MuiLink
      component={Link}
      to={`/user/${url}`}
      onClick={closeDrawer}
      underline="none"
      variant="subtitle2"
      color={isActive ? "primary.main" : "text.primary"}
      borderLeft="4px solid"
      borderColor={isActive ? "primary.main" : "transparent"}
      pr={2}
      pl={3.5}
      sx={{
        "&:hover": {
          color: "primary.main",
          borderColor: "primary.main",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          {Icon}
          <Typography variant="subtitle2">{text}</Typography>
        </Stack>

        <Typography>{no}</Typography>
      </Stack>
    </MuiLink>
  );
};

const DashboardBox = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getCards());
    dispatch(getAddresses());
    dispatch(getWishList());
  }, []);
  const { orders, cards, wishlist } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.address);

  const dashboards = [
    {
      text: "Orders",
      no: orders?.length || 0,
      Icon: <ShoppingBagOutlinedIcon />,
      url: "orders",
    },
    {
      text: "Wishlist",
      no: wishlist?.length || 0,
      Icon: <FavoriteBorderIcon />,
      url: "wishlist",
    },
    // { text: "Support", no: 0, Icon: <HeadsetMicIcon />, url: "support" },
  ];

  const account = [
    {
      text: "Profile Info",
      no: 0,
      Icon: <PersonOutlineOutlinedIcon />,
      url: "profile",
    },
    {
      text: "Addresses",
      no: addresses?.length || 0,
      Icon: <LocationOnIcon />,
      url: "addresses",
    },
    {
      text: "Payment Method",
      no: cards?.length || 0,
      Icon: <PaymentIcon />,
      url: "payments",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Stack spacing={5}>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            DASHBOARD
          </Typography>
          <Stack spacing={2}>
            {dashboards.map((dashboard, index) => (
              <ILink key={index} {...dashboard} closeDrawer={closeDrawer} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            ACCOUNT SETTINGS
          </Typography>
          <Stack spacing={2}>
            {account.map((dashboard, index) => (
              <ILink key={index} {...dashboard} closeDrawer={closeDrawer} />
            ))}
          </Stack>

          <Button
            variant="text"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            sx={{
              textTransform: "none",
              // bgcolor: "#FCE9EC",
              color: "primary.main",
              paddingX: "40px",
              fontWeight: 600,
              paddingY: "6px",
              gap: "5px",
              // marginTop: "50px !important",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            <LogoutIcon />
            <Typography variant="subtitle2">LOGOUT</Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardBox;
