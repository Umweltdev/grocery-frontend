import {
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  styled,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = ({
  title,
  button,
  placeholder,
  route,
  searchQuery,
  setSearchQuery,
}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: theme.palette.background.paper,
      width: isNonMobile ? "380px" : "100%",
      padding: "4px 10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      transition: "all 0.2s ease-in-out",

      "& fieldset": {
        borderColor: theme.palette.grey[300],
        borderWidth: "1.5px",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.primary,
        borderWidth: "2px",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
  }));


  return (
    <Stack spacing={2} px={{ xs: 2, sm: 3 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign={{ xs: "center", sm: "left" }}
        fontSize={{ xs: "22px", sm: "26px" }}
      >
        {title}
      </Typography>

      <Stack
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <CustomTextField
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />

        {button && (
          <Link to={`/admin/${route}`} style={{ textDecoration: "none" }}>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontSize: "15px",
                fontWeight: 600,
                px: 2.5,
                py: 1.4,
                borderRadius: "12px",
                width: { xs: "100%", sm: "auto" },
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <AddIcon fontSize="small" />
              {button}
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

import PropTypes from "prop-types";

Header.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  button: PropTypes.node,
  route: PropTypes.string,
};

export default Header;
