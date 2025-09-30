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
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  MapPin,
  ShoppingCart,
  Tags,
  Tag,
  List as ListIcon,
  PlusCircle,
  Star,
  Info,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

const drawerWidth = 240;
const collapsedWidth = 60;

const menuConfig = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/" },
  {
    label: "Products",
    icon: Package,
    children: [
      { label: "Product List", path: "/admin/products", icon: ListIcon },
      {
        label: "Create Product",
        path: "/admin/product/create",
        icon: PlusCircle,
      },
      { label: "Reviews", path: "/admin/product-reviews", icon: Star },
    ],
  },
  {
    label: "Categories",
    icon: Tags,
    children: [
      { label: "Category List", path: "/admin/categories", icon: ListIcon },
      {
        label: "Create Category",
        path: "/admin/category/create",
        icon: PlusCircle,
      },
    ],
  },
  {
    label: "Brands",
    icon: Tag,
    children: [
      { label: "Brand List", path: "/admin/brands", icon: ListIcon },
      { label: "Create Brand", path: "/admin/brand/create", icon: PlusCircle },
    ],
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    children: [
      { label: "Order List", path: "/admin/orders", icon: ListIcon },
      { label: "Order Details", path: "/admin/order", icon: Info },
    ],
  },
  {
    label: "Addresses",
    icon: MapPin,
    children: [
      { label: "Address List", path: "/admin/addresses", icon: ListIcon },
      {
        label: "Create Address",
        path: "/admin/address/create",
        icon: PlusCircle,
      },
    ],
  },
  { label: "Customers", icon: Users, path: "/admin/customers" },
  { label: "Pricing", icon: TrendingUp, path: "/admin/pricing/dashboard" },
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
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#2B3445",
          color: "white",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "none",
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
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          minHeight: "64px",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <img
            src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
            alt="logo"
            style={{ height: 40 }}
          />
        )}

        <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton
            onClick={() => setCollapsed((prev) => !prev)}
            sx={{
              color: "white",
              padding: "8px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              ...(collapsed && { margin: "0 auto" }),
            }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menu */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "2px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255,255,255,0.5)",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.3) transparent",
        }}
      >
        <List sx={{ py: 0 }}>
          {menuConfig.map((item, idx) => {
            const IconComponent = item.icon;

            return (
              <Box key={idx}>
                {item.children ? (
                  <>
                    <Tooltip
                      title={collapsed ? item.label : ""}
                      placement="right"
                    >
                      <ListItemButton
                        onClick={() => toggleMenu(item.label)}
                        sx={{
                          justifyContent: collapsed ? "center" : "flex-start",
                          px: collapsed ? 1 : 2,
                          minHeight: "48px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "white",
                            minWidth: 40,
                            marginRight: collapsed ? 0 : 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <IconComponent size={20} color="white" />
                        </ListItemIcon>
                        {!collapsed && (
                          <>
                            <ListItemText
                              primary={item.label}
                              sx={{
                                "& .MuiTypography-root": {
                                  color: "white",
                                  fontWeight: 500,
                                  fontSize: "0.9rem",
                                },
                              }}
                            />
                            {openMenus[item.label] ? (
                              <ChevronUp size={18} color="white" />
                            ) : (
                              <ChevronDown size={18} color="white" />
                            )}
                          </>
                        )}
                      </ListItemButton>
                    </Tooltip>

                    <Collapse
                      in={openMenus[item.label] && !collapsed}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child, i) => {
                          const ChildIconComponent = child.icon;

                          return (
                            <Tooltip
                              key={i}
                              title={collapsed ? child.label : ""}
                              placement="right"
                            >
                              <ListItemButton
                                component={NavLink}
                                to={child.path}
                                sx={{
                                  pl: 4,
                                  minHeight: "40px",
                                  "&:hover": {
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.08)",
                                  },
                                  "&.active": {
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.15)",
                                    borderRight: "3px solid white",
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    color: "white",
                                    minWidth: 40,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <ChildIconComponent size={18} color="white" />
                                </ListItemIcon>
                                {!collapsed && (
                                  <ListItemText
                                    primary={child.label}
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "0.8rem",
                                        color: "white",
                                      },
                                    }}
                                  />
                                )}
                              </ListItemButton>
                            </Tooltip>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <Tooltip
                    title={collapsed ? item.label : ""}
                    placement="right"
                  >
                    <ListItemButton
                      component={NavLink}
                      to={item.path}
                      sx={{
                        justifyContent: collapsed ? "center" : "flex-start",
                        px: collapsed ? 1 : 2,
                        minHeight: "48px",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&.active": {
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          borderRight: "3px solid white",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "white",
                          minWidth: 40,
                          marginRight: collapsed ? 0 : 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconComponent size={20} color="white" />
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText
                          primary={item.label}
                          sx={{
                            "& .MuiTypography-root": {
                              color: "white",
                              fontWeight: 500,
                              fontSize: "0.9rem",
                            },
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Logout */}
      <Box
        sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", flexShrink: 0 }}
      >
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              dispatch(logout());
              dispatch(resetState());
              navigate("/");
            }}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1 : 2,
              minHeight: "48px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 40,
                marginRight: collapsed ? 0 : 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LogOut size={20} color="white" />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                sx={{
                  "& .MuiTypography-root": {
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

SideBar.propTypes = {
  handleDrawerClose: PropTypes.func,
};

export default SideBar;
