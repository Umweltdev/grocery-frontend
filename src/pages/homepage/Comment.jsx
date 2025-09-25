import { useMemo } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Review card
const ReviewBox = ({ customer, image, comment }) => {
  const initials = customer
    ? customer
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Box
      bgcolor="white"
      borderRadius="12px"
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)" },
      }}
      height={{ xs: "auto", sm: "220px" }}
      mx={1.5}
      p={{ xs: 3, md: 4 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        textAlign={{ xs: "center", sm: "left" }}
      >
        <Avatar
          alt={customer}
          src={image?.url}
          sx={{ width: 64, height: 64, fontSize: 18 }}
        >
          {!image?.url && initials}
        </Avatar>
        <Stack spacing={1}>
          <Typography
            variant="body2"
            lineHeight="1.7"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            &ldquo;{comment}&rdquo;
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            fontSize="16px"
            textTransform="capitalize"
            color="text.primary"
          >
            {customer}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

ReviewBox.propTypes = {
  customer: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  comment: PropTypes.string,
};

ReviewBox.defaultProps = {
  customer: "Anonymous",
  image: null,
  comment: "No comment provided",
};

// ✅ Main comment slider
const Comment = ({ products }) => {
  const reviews = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return products.flatMap((product) =>
      (product.ratings || []).map((rating) => ({
        _id: product._id,
        image: rating.postedby?.image || null,
        customer: rating.postedby?.fullName || "Anonymous",
        comment: rating.comment || "No comment provided",
      }))
    );
  }, [products]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!reviews.length) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body2" color="text.secondary">
          No customer reviews available yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box py={6} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h5"
        mb={3}
        fontWeight={700}
        color="text.primary"
        textAlign="center"
      >
        What Our Customers Say
      </Typography>
      <Slider {...settings}>
        {reviews.map((item, index) => (
          <div key={index}>
            <ReviewBox {...item} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

Comment.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ratings: PropTypes.arrayOf(
        PropTypes.shape({
          comment: PropTypes.string,
          postedby: PropTypes.shape({
            fullName: PropTypes.string,
            image: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
        })
      ),
    })
  ),
};

Comment.defaultProps = {
  products: [],
};

export default Comment;
