import { useState } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  Dashboard,
  CardGiftcard,
  PeopleAlt,
  Logout,
  Place,
  Book,
  Category,
  Apps,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

const drawerWidth = 280;

const menuConfig = [
  { label: "Dashboard", icon: <Dashboard />, path: "/admin/" },
  {
    label: "Products",
    icon: <CardGiftcard />,
    children: [
      { label: "Product List", path: "/admin/products" },
      { label: "Create Product", path: "/admin/product/create" },
      { label: "Review", path: "/admin/product-reviews" },
    ],
  },
  {
    label: "Categories",
    icon: <Category />,
    children: [
      { label: "Category List", path: "/admin/categories" },
      { label: "Create Category", path: "/admin/category/create" },
    ],
  },
  {
    label: "Brands",
    icon: <Apps />,
    children: [
      { label: "Brand List", path: "/admin/brands" },
      { label: "Create Brand", path: "/admin/brand/create" },
    ],
  },
  {
    label: "Orders",
    icon: <Book />,
    children: [
      { label: "Order List", path: "/admin/orders" },
      { label: "Order Details", path: "/admin/order" },
    ],
  },
  {
    label: "Collection Addresses",
    icon: <Place />,
    children: [
      { label: "Address List", path: "/admin/addresses" },
      { label: "Create Address", path: "/admin/address/create" },
    ],
  },
  { label: "Customers", icon: <PeopleAlt />, path: "/admin/customers" },
  // {
  //   label: "RCD-MCD",
  //   icon: <TrendingUp />,
  //   children: [
  //     { label: "MCD Settings", path: "/admin/pricing/mcd" },
  //     { label: "RCD Settings", path: "/admin/pricing/rcd" },
  //     { label: "AED Dashboard", path: "/admin/pricing/aed" },
  //     { label: "Pricing Dashboard", path: "/admin/pricing/dashboard" },
  //   ],
  // },
];

const SideBar = ({ handleDrawerClose }) => {
  const [openMenus, setOpenMenus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#2B3445",
          color: "white",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <img
          src="https://res.cloudinary.com/dlst0is1v/image/upload/v1759063260/Gemini_Generated_Image_9a3gep9a3gep9a3g_1_qxkjji.png"
          alt="logo"
          style={{ height: 40 }}
        />
        <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
          <ChevronLeft />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List>
        {menuConfig.map((item, idx) => (
          <Box key={idx}>
            {item.children ? (
              <>
                <ListItemButton onClick={() => toggleMenu(item.label)}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                  {openMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openMenus[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child, i) => (
                      <ListItemButton
                        key={i}
                        component={NavLink}
                        to={child.path}
                        sx={{ pl: 4 }}
                        onClick={handleDrawerClose}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={handleDrawerClose}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </Box>
        ))}

        {/* Logout */}
        <ListItemButton
          onClick={() => {
            dispatch(logout());
            dispatch(resetState());
            navigate("/");
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
};

export default SideBar;
