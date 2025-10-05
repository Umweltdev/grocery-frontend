import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu,
  Dashboard,
  CardGiftcard,
  PeopleAlt,
  Logout,
  Place,
  Book,
  Category,
  Apps,
  ListAlt,
  AddCircleOutline,
  RateReview,
  FormatListBulleted,
  LocationOn,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

const drawerWidth = 250;
const collapsedWidth = 70;
const sidebarBg = "#2B3445";

const menuConfig = [
  { label: "Dashboard", icon: <Dashboard />, path: "/admin/" },
  {
    label: "Products",
    icon: <CardGiftcard />,
    children: [
      { label: "Product List", path: "/admin/products", icon: <ListAlt /> },
      {
        label: "Create Product",
        path: "/admin/product/create",
        icon: <AddCircleOutline />,
      },
      { label: "Review", path: "/admin/product-reviews", icon: <RateReview /> },
    ],
  },
  {
    label: "Categories",
    icon: <Category />,
    children: [
      {
        label: "Category List",
        path: "/admin/categories",
        icon: <FormatListBulleted />,
      },
      {
        label: "Create Category",
        path: "/admin/category/create",
        icon: <AddCircleOutline />,
      },
    ],
  },
  {
    label: "Brands",
    icon: <Apps />,
    children: [
      { label: "Brand List", path: "/admin/brands", icon: <ListAlt /> },
      {
        label: "Create Brand",
        path: "/admin/brand/create",
        icon: <AddCircleOutline />,
      },
    ],
  },
  {
    label: "Orders",
    icon: <Book />,
    children: [
      { label: "Order List", path: "/admin/orders", icon: <ListAlt /> },
      { label: "Order Details", path: "/admin/order", icon: <ListAlt /> },
    ],
  },
  {
    label: "Collection Addresses",
    icon: <Place />,
    children: [
      { label: "Address List", path: "/admin/addresses", icon: <LocationOn /> },
      {
        label: "Create Address",
        path: "/admin/address/create",
        icon: <AddCircleOutline />,
      },
    ],
  },
  { label: "Customers", icon: <PeopleAlt />, path: "/admin/customers" },
];

const SideBar = ({ collapsed, setCollapsed, onClose }) => {
  const [openMenus, setOpenMenus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Box
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        bgcolor: sidebarBg,
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s",
        overflow: "hidden",
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          p: 2,
          cursor: "pointer",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {!collapsed ? (
          <img
            src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
            alt="logo"
            style={{ height: 50 }}
          />
        ) : (
          <IconButton sx={{ color: "white" }}>
            <Menu />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "2px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255,255,255,0.5)",
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {menuConfig.map((item, idx) => (
            <Box key={idx}>
              {item.children ? (
                <>
                  <ListItemButton
                    onClick={() => toggleMenu(item.label)}
                    sx={{
                      justifyContent: collapsed ? "center" : "flex-start",
                      py: 1.5,
                      px: 2,
                      mb: 0.5,
                      "&:hover": {
                        bgcolor: "white",
                        color: sidebarBg,
                        "& .MuiListItemIcon-root": { color: sidebarBg },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                        minWidth: collapsed ? "auto" : 40,
                        display: "flex",
                        justifyContent: "center",
                        mr: collapsed ? 0 : 2,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      />
                    )}
                    {!collapsed &&
                      (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>

                  <Collapse
                    in={openMenus[item.label] && !collapsed}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child, i) => (
                        <Tooltip
                          key={i}
                          title={collapsed ? child.label : ""}
                          placement="right"
                        >
                          <ListItemButton
                            component={NavLink}
                            to={child.path}
                            onClick={onClose}
                            sx={{
                              pl: 4,
                              py: 1.25,
                              mb: 0.25,
                              "&:hover": {
                                bgcolor: "white",
                                color: sidebarBg,
                                "& .MuiListItemIcon-root": { color: sidebarBg },
                              },
                              "&.active": {
                                bgcolor: "primary.main",
                                color: "white",
                                "& .MuiListItemIcon-root": { color: "white" },
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: "white",
                                minWidth: 32,
                                display: "flex",
                                justifyContent: "center",
                                mr: 2,
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{ fontSize: "13px" }}
                            />
                          </ListItemButton>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Tooltip title={collapsed ? item.label : ""} placement="right">
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    onClick={onClose}
                    sx={{
                      justifyContent: collapsed ? "center" : "flex-start",
                      py: 1.5,
                      px: 2,
                      mb: 0.5,
                      "&:hover": {
                        bgcolor: "white",
                        color: sidebarBg,
                        "& .MuiListItemIcon-root": { color: sidebarBg },
                      },
                      "&.active": {
                        bgcolor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": { color: "white" },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                        minWidth: collapsed ? "auto" : 40,
                        display: "flex",
                        justifyContent: "center",
                        mr: collapsed ? 0 : 2,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              )}
            </Box>
          ))}
        </List>
      </Box>
      <Box sx={{ flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              dispatch(logout());
              dispatch(resetState());
              navigate("/");
            }}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              py: 1.5,
              px: 2,
              "&:hover": {
                bgcolor: "white",
                color: sidebarBg,
                "& .MuiListItemIcon-root": { color: sidebarBg },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: collapsed ? "auto" : 40,
                display: "flex",
                justifyContent: "center",
                mr: collapsed ? 0 : 2,
              }}
            >
              <Logout />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default SideBar;
