import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const CategoryCard = ({ name, image, _id }) => (
  <Grid item xs={6} sm={4} md={3} lg={2}>
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/store?category=${_id}`}
        sx={{ height: "100%", textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          height="160"
          image={image?.url}
          alt={name}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.primary"
            textAlign="center"
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ url: PropTypes.string }),
  ]),
  _id: PropTypes.string.isRequired,
};

export default CategoryCard;
