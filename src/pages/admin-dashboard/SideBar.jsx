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
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

const drawerWidth = 280;
const collapsedWidth = 70;

const menuConfig = [
  { label: "Dashboard", icon: Dashboard, path: "/admin/" },
  {
    label: "Products",
    icon: CardGiftcard,
    children: [
      { label: "Product List", path: "/admin/products", icon: ListAlt },
      {
        label: "Create Product",
        path: "/admin/product/create",
        icon: AddCircleOutline,
      },
      { label: "Review", path: "/admin/product-reviews", icon: RateReview },
    ],
  },
  {
    label: "Categories",
    icon: Category,
    children: [
      {
        label: "Category List",
        path: "/admin/categories",
        icon: FormatListBulleted,
      },
      {
        label: "Create Category",
        path: "/admin/category/create",
        icon: AddCircleOutline,
      },
    ],
  },
  {
    label: "Brands",
    icon: Apps,
    children: [
      { label: "Brand List", path: "/admin/brands", icon: ListAlt },
      {
        label: "Create Brand",
        path: "/admin/brand/create",
        icon: AddCircleOutline,
      },
    ],
  },
  {
    label: "Orders",
    icon: Book,
    children: [
      { label: "Order List", path: "/admin/orders", icon: ListAlt },
      { label: "Order Details", path: "/admin/order", icon: ListAlt },
    ],
  },
  {
    label: "Collection Addresses",
    icon: Place,
    children: [
      { label: "Address List", path: "/admin/addresses", icon: ListAlt },
      {
        label: "Create Address",
        path: "/admin/address/create",
        icon: AddCircleOutline,
      },
    ],
  },
  { label: "Customers", icon: PeopleAlt, path: "/admin/customers" },
];

const SideBar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width 0.3s",
          boxSizing: "border-box",
          backgroundColor: "#2B3445",
          color: "white",
          overflowX: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          p: 2,
          cursor: "pointer",
        }}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {!collapsed && (
          <img
            src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
            alt="logo"
            style={{ height: 50 }}
          />
        )}
        {collapsed && (
          <IconButton sx={{ color: "white" }}>
            <Menu />
          </IconButton>
        )}
      </Box>
      <List>
        {menuConfig.map((item, idx) => (
          <Box key={idx}>
            {item.children ? (
              <>
                <ListItemButton
                  onClick={() => toggleMenu(item.label)}
                  sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: collapsed ? "auto" : 40,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
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
                      <ListItemButton
                        key={i}
                        component={NavLink}
                        to={child.path}
                        sx={{ pl: 6 }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "white",
                            minWidth: 40,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <child.icon />
                        </ListItemIcon>
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Tooltip title={collapsed ? item.label : ""} placement="right">
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: collapsed ? "auto" : 40,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            )}
          </Box>
        ))}
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              dispatch(logout());
              dispatch(resetState());
              navigate("/");
            }}
            sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: collapsed ? "auto" : 40,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  handleDrawerClose: PropTypes.func,
};

export default SideBar;
