import {
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  styled,
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "white",
      width: isNonMobile ? "350px" : "100%",
      padding: "5px 12px",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
        outline: "none",
      },
    },
  });
  return (
    <Stack spacing={3} px={3}>
      <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
        {title}
      </Typography>
      <Stack
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        rowGap={{ xs: 2, sm: 0 }}
      >
        <CustomTextField
          id="input-with-icon-textfield"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
        {button && (
          <Link to={`/admin/${route}`}>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
                color: "white",
                fontSize: "14px",
                paddingX: "15px",
                fontWeight: 600,
                paddingY: "13px",
                alignSelf: isNonMobile ? "start" : "stretch",
                borderRadius: "10px",
                alignItems: "center",
                width: isNonMobile ? "auto" : "100%",
                gap: 1,

                "&:hover": {
                  backgroundColor: "#2756b6",
                },
              }}
            >
              <AddIcon />
              <Typography variant="subtitle1">{button}</Typography>
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
