import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ICard from "../../components/ui-elements/Card";
import ScaleLoader from "react-spinners/PulseLoader";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function SampleNextArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "-5px",
        transform: "translateY(-50%)",
        background: "#FFD700",
        color: "black",
        zIndex: 2,
        "&:hover": { background: "#FFC300" },
      }}
    >
      <ArrowForwardIcon fontSize="small" />
    </IconButton>
  );
}

SampleNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function SamplePrevArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "-5px",
        transform: "translateY(-50%)",
        background: "#FFD700",
        color: "black",
        zIndex: 2,
        "&:hover": { background: "#FFC300" },
      }}
    >
      <ArrowBackIcon fontSize="small" />
    </IconButton>
  );
}

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Offer = () => {
  const navigate = useNavigate();
  return (
    <Box
      bgcolor="#FFF8E5"
      py={5}
      px={{ xs: 4, lg: 7 }}
      sx={{ borderRadius: "8px" }}
    >
      <Grid container spacing={{ xs: 4, sm: 0 }} alignItems="center">
        <Grid item xs={12} sm={7} order={{ xs: 1, sm: 0 }}>
          <Stack spacing={2.5}>
            <Typography
              variant="h6"
              fontWeight={500}
              color="primary.main"
              fontSize={{ sm: "25px", md: "30px" }}
            >
              Closing on
            </Typography>
            <Typography
              variant="h5"
              lineHeight={1.4}
              fontSize={{ sm: "25px", md: "30px" }}
            >
              25% Special Off Today Only for Vegetables
            </Typography>
            <Button
              onClick={() => navigate("/store")}
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                fontSize: "14px",
                px: "20px",
                py: "8px",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#E3364E" },
              }}
            >
              Shop Now
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5}>
          <img
            src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fkisspng-organic-food-leaf-vegetable-fruit-rich-vegetables-5aa9f4d026ae09%201.png&w=384&q=75"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Offer"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Carousel = ({ title, productList, isLoading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 968, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Stack spacing={3}>
      <Typography
        variant="h5"
        sx={{ mb: 1, color: "#E3364E", textAlign: "center", fontSize: "28px" }}
      >
        {title}
      </Typography>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
        >
          <ScaleLoader
            color="#E3364E"
            height={30}
            width={6}
            margin={4}
            radius={2}
            loading
          />
        </Box>
      ) : productList.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
        >
          <Typography variant="h6" textAlign="center">
            No products found
          </Typography>
        </Box>
      ) : (
        <Slider {...settings}>
          {productList.map((item, index) => (
            <div key={index} className="carousel-card">
              <ICard {...item} />
            </div>
          ))}
        </Slider>
      )}
    </Stack>
  );
};

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  productList: PropTypes.array,
  isLoading: PropTypes.bool,
};

Carousel.defaultProps = {
  productList: [],
  isLoading: false,
};

export const Carousel1 = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      <Offer />
      <Offer />
      <Offer />
    </Slider>
  );
};

export const Carousel2 = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <Offer />
      <Offer />
    </Slider>
  );
};
