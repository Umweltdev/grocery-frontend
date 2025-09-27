import {
  Typography,
  Box,
  Stack,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useSelector } from "react-redux";
import DashboardHeader from "./Header";

const Profile = ({ openDrawer }) => {
  const auth = useSelector((state) => state.auth);
  const { orders, user } = auth;

  console.log("USER DATA", user);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <Stack spacing={4}>
      <DashboardHeader
        Icon={PersonIcon}
        title="My Profile"
        openDrawer={openDrawer}
        button="Edit Profile"
        link={`/user/profile/${user?._id}`}
      />

      {/* Hero Profile Card */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          background: "linear-gradient(135deg, #E3364E 0%, #4f3e60ff 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  />
                }
              >
                <Avatar
                  src={user?.image || ""}
                  sx={{
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    border: "4px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
              </Badge>
            </Grid>
            <Grid item xs={12} sm>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  flexWrap="wrap"
                >
                  <Typography variant="h4" fontWeight={700}>
                    {user?.fullName || "User"}
                  </Typography>
                  <VerifiedIcon sx={{ color: "#4CAF50" }} />
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip
                    label={`Total Order(s): ${orders?.length || 0}`}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={`Member since ${memberSince}`}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      {/* <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "primary.300",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>
                {orders?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "success.300",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                {Math.floor(Math.random() * 50) + 10}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Items Bought
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "warning.300",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" color="warning.main" fontWeight={700}>
                ₦
                {(Math.random() * 50000 + 10000).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "error.300",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" color="error.main" fontWeight={700}>
                ₦
                {(Math.random() * 5000 + 500).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Saved (RCD)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Personal Information */}
      <Card
        elevation={0}
        sx={{
          // border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "#FFF",
          boxShadow: "0 8px 25px 0 rgb(0 0 0 / 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            borderColor: "primary.300",
            boxShadow: "0 8px 25px 0 rgb(0 0 0 / 0.3)",
            transform: "translateY(-4px)",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h6" fontWeight={600}>
              Personal Information
            </Typography>
            {/* <IconButton
              size="small"
              sx={{
                bgcolor: "primary.50",
                color: "primary.main",
                "&:hover": { bgcolor: "primary.100" },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton> */}
          </Stack>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "primary.50",
                    color: "primary.main",
                  }}
                >
                  <PersonIcon />
                </Box>
                <Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    FULL NAME
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.fullName || "Not provided"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "success.50",
                    color: "success.main",
                  }}
                >
                  <EmailIcon />
                </Box>
                <Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    EMAIL ADDRESS
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.email || "Not provided"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "warning.50",
                    color: "warning.main",
                  }}
                >
                  <PhoneIcon />
                </Box>
                <Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    PHONE NUMBER
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.phone || "Not provided"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "info.50",
                    color: "info.main",
                  }}
                >
                  <CakeIcon />
                </Box>
                <Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    DATE OF BIRTH
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.dob
                      ? new Date(user.dob).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Not provided"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Profile;
