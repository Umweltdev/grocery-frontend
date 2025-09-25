import {
  Stack,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";
import FilterListIcon from "@mui/icons-material/FilterList";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

const Sort = ({ activeIcon, setActiveIcon, sort, setSort, openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  return (
    <Box
      bgcolor="white"
      p={{ xs: 2, sm: 3 }}
      mb={1}
      borderRadius={2}
      width="100%"
      sx={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={1.5}
        alignItems="center"
        flex={1}
        flexWrap="nowrap"
      >
        <Typography fontWeight={600} color="text.primary">
          Sort By:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{
              borderRadius: 1,
              "& .MuiSelect-select": { py: 0.6, px: 1.2, fontWeight: 500 },
            }}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="new_arrivals">New Arrivals</MenuItem>
            <MenuItem value="price_low_high">Price Low to High</MenuItem>
            <MenuItem value="price_high_low">Price High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mt={{ xs: 1, sm: 0 }}
      >
        <Typography fontWeight={600} color="text.primary">
          View:
        </Typography>
        <IconButton
          onClick={() => setActiveIcon("apps")}
          sx={{
            color: activeIcon === "apps" ? "#D23F57" : "rgba(0,0,0,0.54)",
            transition: "color 0.2s ease",
            "&:hover": { color: "#D23F57" },
          }}
        >
          <AppsIcon />
        </IconButton>
        <IconButton
          onClick={() => setActiveIcon("view")}
          sx={{
            color: activeIcon === "view" ? "#D23F57" : "rgba(0,0,0,0.54)",
            transition: "color 0.2s ease",
            "&:hover": { color: "#D23F57" },
          }}
        >
          <ViewListIcon />
        </IconButton>

        {!isNonMobile && (
          <IconButton
            onClick={openDrawer}
            sx={{
              color: "rgba(0,0,0,0.6)",
              "&:hover": { color: "#D23F57" },
            }}
          >
            <FilterListIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

Sort.propTypes = {
  activeIcon: PropTypes.string.isRequired,
  setActiveIcon: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
};

export default Sort;
