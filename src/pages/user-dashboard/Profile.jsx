import {
  Typography,
  Box,
  Stack,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardHeader from "./Header";

const Profile = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");

  const auth = useSelector((state) => state.auth);
  const { orders, user } = auth;
  return (
    <Stack spacing={3}>
      <DashboardHeader
        Icon={PersonIcon}
        title={"My Profile"}
        openDrawer={openDrawer}
        button="Edit Profile"
        link={`/user/profile/${user?._id}`}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  alt="profile-picture"
                  src={user?.image || ""}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "3px solid",
                    borderColor: "primary.100",
                  }}
                />
                <Stack spacing={1}>
                  <Typography variant="h5" fontWeight={600}>
                    {user?.fullName || "User"}
                  </Typography>
                  <Chip
                    label="Active Member"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "primary.50",
            }}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h3" color="primary.main" fontWeight={700}>
                {orders?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  FIRST NAME
                </Typography>
                <Typography variant="body1" textTransform="capitalize">
                  {user?.fullName?.split(" ")[0] || "N/A"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  LAST NAME
                </Typography>
                <Typography variant="body1" textTransform="capitalize">
                  {user?.fullName?.split(" ")[1] || "N/A"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  EMAIL ADDRESS
                </Typography>
                <Typography variant="body1">{user?.email || "N/A"}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  PHONE NUMBER
                </Typography>
                <Typography variant="body1">{user?.phone || "N/A"}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  DATE OF BIRTH
                </Typography>
                <Typography variant="body1">
                  {user?.dob
                    ? new Date(user.dob).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Profile;
