import { Typography, Stack, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const DashboardHeader = ({ Icon, title, button, openDrawer, link }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const marginBottom = button ? { xs: 1.5, md: 0 } : 0;
  const alignment =  button ? "start" : "center"

  return (
    <Box
      sx={{
        mb: 4,
        pb: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems={alignment}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "start", md: "center" }}
          width={{ xs: "auto", md: "100%" }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mb={marginBottom}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "primary.50",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon />
            </Box>
            <Typography
              variant="h4"
              color="text.primary"
              fontWeight={700}
              fontSize={{ xs: "24px", md: "28px" }}
            >
              {title}
            </Typography>
          </Stack>
          {button && (
            <Link
              to={link}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 0.12)",
                  },
                }}
              >
                {button}
              </Button>
            </Link>
          )}
        </Stack>

        <IconButton
          onClick={openDrawer}
          sx={{
            display: isNonMobile ? "none" : "inline-flex",
            bgcolor: "grey.100",
            "&:hover": {
              bgcolor: "grey.200",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
