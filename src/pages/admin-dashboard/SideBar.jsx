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
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

// Import Lucide icons individually to avoid any issues
import { LayoutDashboard } from "lucide-react";
import { Package } from "lucide-react";
import { Users } from "lucide-react";
import { LogOut } from "lucide-react";
import { MapPin } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Tags } from "lucide-react";
import { Tag } from "lucide-react";
import { List as ListIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Star } from "lucide-react";
import { Info } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";

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

  // Render icon component with proper styling
  const renderIcon = (IconComponent, size = 20) => {
    if (!IconComponent) {
      console.log('No icon component provided');
      return null;
    }
    
    try {
      return (
        <IconComponent
          size={size}
          color="white"
          strokeWidth={2}
          style={{
            display: "block",
            flexShrink: 0,
            width: size,
            height: size,
          }}
        />
      );
    } catch (error) {
      console.error('Error rendering icon:', error);
      return <div style={{ width: size, height: size, backgroundColor: 'white' }} />;
    }
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
      {/* Header Section */}
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
            {collapsed ? renderIcon(ChevronRight) : renderIcon(ChevronLeft)}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
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
        <List sx={{ py: 0 }}>
          {menuConfig.map((item, index) => (
            <Box key={item.label}>
              {/* Parent Menu Items with Children */}
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
                          minWidth: collapsed ? "auto" : 40,
                          marginRight: collapsed ? 0 : 2,
                          justifyContent: "center",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {renderIcon(item.icon)}
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
                          <Box sx={{ color: "white", display: "flex" }}>
                            {openMenus[item.label]
                              ? renderIcon(ChevronUp, 18)
                              : renderIcon(ChevronDown, 18)}
                          </Box>
                        </>
                      )}
                    </ListItemButton>
                  </Tooltip>

                  {/* Child Menu Items - Show as individual icons when collapsed */}
                  {collapsed ? (
                    // When collapsed, show child items as individual icon buttons
                    item.children.map((child) => (
                      <Tooltip
                        key={child.label}
                        title={child.label}
                        placement="right"
                      >
                        <ListItemButton
                          component={NavLink}
                          to={child.path}
                          sx={{
                            justifyContent: "center",
                            px: 1,
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
                              minWidth: "auto",
                              justifyContent: "center",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {renderIcon(child.icon, 18)}
                          </ListItemIcon>
                        </ListItemButton>
                      </Tooltip>
                    ))
                  ) : (
                    // When expanded, show normal collapsible child menu
                    <Collapse
                      in={openMenus[item.label]}
                      timeout="auto"
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <Tooltip
                            key={child.label}
                            title={""}
                            placement="right"
                          >
                            <ListItemButton
                              component={NavLink}
                              to={child.path}
                              sx={{
                                pl: 4,
                                minHeight: "40px",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                                },
                                "&.active": {
                                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                                  borderRight: "3px solid white",
                                },
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 40,
                                  justifyContent: "center",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {renderIcon(child.icon, 18)}
                              </ListItemIcon>
                              <ListItemText
                                primary={child.label}
                                sx={{
                                  "& .MuiTypography-root": {
                                    fontSize: "0.8rem",
                                    color: "white",
                                  },
                                }}
                              />
                            </ListItemButton>
                          </Tooltip>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </>
              ) : (
                /* Single Menu Items (no children) */
                <Tooltip title={collapsed ? item.label : ""} placement="right">
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
                        minWidth: collapsed ? "auto" : 40,
                        marginRight: collapsed ? 0 : 2,
                        justifyContent: "center",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {renderIcon(item.icon)}
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
          ))}
        </List>
      </Box>

      {/* Logout Section */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          flexShrink: 0,
        }}
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
                minWidth: collapsed ? "auto" : 40,
                marginRight: collapsed ? 0 : 2,
                justifyContent: "center",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              {renderIcon(LogOut)}
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
