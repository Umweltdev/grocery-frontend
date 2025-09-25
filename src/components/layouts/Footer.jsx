import {
  Typography,
  Box,
  Link as MuiLink,
  Stack,
  Grid,
  Icon,
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const companyInfo = {
  logo: "https://bazaar.ui-lib.com/assets/images/logo.svg",
  description:
    "Your one-stop online store for everything you love. Fast delivery, best prices, and quality guaranteed.",
  address: "70 Washington Square South, New York, NY 10012, United States",
  email: "uilib.help@gmail.com",
  phone: "+1 1123 456 780",
};

const quickLinks = [
  { title: "Careers", url: "/careers" },
  { title: "Our Stores", url: "/stores" },
  { title: "Our Cares", url: "/cares" },
  { title: "Terms & Conditions", url: "/terms" },
  { title: "Privacy Policy", url: "/privacy" },
];

const customerCareLinks = [
  { title: "Help Center", url: "/help" },
  { title: "How To Buy", url: "/buy" },
  { title: "Track Your Order", url: "/track" },
  { title: "Corporate & Bulk Purchasing", url: "/corporate" },
  { title: "Returns & Refunds", url: "/returns" },
];

const socialIcons = [
  { iconClass: "fa-brands fa-facebook-f", url: "https://facebook.com" },
  { iconClass: "fa-brands fa-twitter", url: "https://twitter.com" },
  { iconClass: "fa-brands fa-google", url: "https://google.com" },
  { iconClass: "fa-brands fa-youtube", url: "https://youtube.com" },
  { iconClass: "fa-brands fa-instagram", url: "https://instagram.com" },
];

const payments = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    alt: "Visa",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    alt: "Mastercard",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    alt: "PayPal",
  },
];

const SocialIcon = ({ iconClass, url, ariaLabel }) => (
  <MuiLink
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    sx={{
      bgcolor: "rgba(255,255,255,0.08)",
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      transition: "all 0.3s ease",
      "&:hover": {
        bgcolor: "rgba(255,255,255,0.25)",
        transform: "scale(1.1)",
      },
    }}
  >
    <Icon className={iconClass} sx={{ fontSize: 16, color: "white" }} />
  </MuiLink>
);

SocialIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};

SocialIcon.defaultProps = {
  ariaLabel: "social link",
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "secondary.dark",
        color: "white",
        pt: 8,
        pb: 5,
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={8} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Stack
              spacing={2}
              alignItems={{ xs: "center", sm: "flex-start" }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <Box>
                <img
                  src={companyInfo.logo}
                  alt="Brand Logo"
                  style={{ height: 48 }}
                />
              </Box>
              <Typography color="rgba(255,255,255,0.7)" maxWidth="90%">
                {companyInfo.description}
              </Typography>
              <Stack spacing={0.8} mt={1}>
                <Typography color="rgba(255,255,255,0.6)">
                  📍 {companyInfo.address}
                </Typography>
                <Typography color="rgba(255,255,255,0.6)">
                  ✉️ {companyInfo.email}
                </Typography>
                <Typography color="rgba(255,255,255,0.6)">
                  ☎️ {companyInfo.phone}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1.5}
                mt={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                {socialIcons.map(({ iconClass, url }, idx) => (
                  <SocialIcon
                    key={idx}
                    iconClass={iconClass}
                    url={url}
                    ariaLabel={iconClass.split(" ").pop()?.replace("fa-", "")}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2.5}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ letterSpacing: 0.3 }}
            >
              About
            </Typography>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }}>
              {quickLinks.map((link, idx) => (
                <MuiLink
                  key={idx}
                  component={Link}
                  to={link.url}
                  underline="none"
                  color="rgba(255,255,255,0.7)"
                  fontSize="14px"
                  sx={{
                    "&:hover": { color: "#fff", transform: "translateX(4px)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.title}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2.5}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ letterSpacing: 0.3 }}
            >
              Customer Care
            </Typography>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }}>
              {customerCareLinks.map((link, idx) => (
                <MuiLink
                  key={idx}
                  component={Link}
                  to={link.url}
                  underline="none"
                  color="rgba(255,255,255,0.7)"
                  fontSize="14px"
                  sx={{
                    "&:hover": { color: "#fff", transform: "translateX(4px)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.title}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3} textAlign={{ xs: "center", sm: "left" }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ letterSpacing: 0.3 }}
            >
              Secure Payments
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              flexWrap="wrap"
            >
              {payments.map(({ src, alt }, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  alt={alt}
                  sx={{
                    height: 30,
                    filter: "brightness(0) invert(1)",
                    opacity: 0.9,
                    transition: "all 0.3s ease",
                    "&:hover": { opacity: 1, transform: "scale(1.05)" },
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 5 }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            color="rgba(255,255,255,0.6)"
            fontSize="14px"
            textAlign="center"
          >
            © {new Date().getFullYear()} Bazaar. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <MuiLink
              component={Link}
              to="/privacy"
              underline="none"
              color="rgba(255,255,255,0.7)"
              fontSize="14px"
              sx={{ "&:hover": { color: "#fff" } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              underline="none"
              color="rgba(255,255,255,0.7)"
              fontSize="14px"
              sx={{ "&:hover": { color: "#fff" } }}
            >
              Terms & Conditions
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
