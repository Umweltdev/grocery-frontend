import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Stack,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";

const ReviewBox = ({ customer, image, comment, rating = 5 }) => {

  const initials = customer
    ? customer
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "24px",
        padding: { xs: 3, sm: 4, md: 5 },
        margin: { xs: 1, sm: 2 },
        boxShadow:
          "0 20px 60px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        position: "relative",
        overflow: "hidden",
        width: "calc(100% - 32px)",
        minHeight: { xs: "300px", sm: "280px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          transform: "translateY(-12px) scale(1.02)",
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.06)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)",
        },
      }}
    >
      <QuoteIcon
        sx={{
          position: "absolute",
          top: 16,
          right: 20,
          fontSize: 48,
          color: "primary.main",
          transform: "rotate(180deg)",
        }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
        textAlign={{ xs: "center", sm: "left" }}
        width="100%"
      >
        <Box position="relative">
          <Avatar
            alt={customer}
            src={image?.url}
            sx={{
              width: 80,
              height: 80,
              fontSize: 20,
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
              border: "3px solid white",
            }}
          >
            {!image?.url && initials}
          </Avatar>

          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              background: "linear-gradient(135deg, #4ECDC4, #44A08D)",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <StarIcon sx={{ fontSize: 12, color: "white" }} />
          </Box>
        </Box>
        <Stack spacing={2} flex={1}>
          <Box>
            <Rating
              value={rating}
              readOnly
              precision={0.5}
              icon={<StarIcon sx={{ fontSize: 20 }} />}
              emptyIcon={<StarIcon sx={{ fontSize: 20, opacity: 0.3 }} />}
              sx={{
                color: "#FFD700",
                "& .MuiRating-iconFilled": {
                  textShadow: "0 2px 4px rgba(255, 215, 0, 0.3)",
                },
              }}
            />
          </Box>
          <Typography
            variant="body1"
            lineHeight="1.8"
            color="text.primary"
            sx={{
              fontStyle: "italic",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              background: "linear-gradient(135deg, #2C3E50, #34495E)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 500,
            }}
          >
            &ldquo;{comment}&rdquo;
          </Typography>
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize="1.1rem"
              textTransform="capitalize"
              sx={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {customer}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
              sx={{ opacity: 0.8 }}
            >
              Verified Customer
            </Typography>
          </Stack>
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
  rating: PropTypes.number,
};

ReviewBox.defaultProps = {
  customer: "Anonymous",
  image: null,
  comment: "No comment provided",
  rating: 5,
};

const Comment = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const reviews = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return products.flatMap((product) =>
      (product.ratings || []).map((rating) => ({
        _id: `${product._id}-${rating._id || Math.random()}`,
        image: rating.postedby?.image || null,
        customer: rating.postedby?.fullName || "Anonymous",
        comment: rating.comment || "No comment provided",
        rating: rating.star || 5,
      }))
    );
  }, [products]);

  const settings = {
    dots: true,
    arrows: !isMobile,
    infinite: true,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    pauseOnHover: true,
    appendDots: (dots) => (
      <Box sx={{ position: "relative", bottom: -40 }}>
        <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
      </Box>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          opacity: 0.4,
          transition: "all 0.3s ease",
          "&.slick-active": {
            opacity: 1,
            transform: "scale(1.2)",
          },
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  if (!reviews.length) {
    return (
      <Box
        textAlign="center"
        py={8}
        sx={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          borderRadius: "24px",
          margin: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.7 }}>
          Be the first to share your experience!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      py={10}
      px={{ xs: 2, md: 6 }}
      sx={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
        },
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            background: "linear-gradient(135deg, #2C3E50, #4A235A)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 2,
          }}
        >
          Voices of Satisfaction
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            opacity: 0.8,
            fontSize: { xs: "1rem", md: "1.2rem" },
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Discover why thousands of customers trust us for their daily
          essentials
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Slider {...settings}>
          {reviews.map((item) => (
            <div key={item._id}>
              <ReviewBox {...item} />
            </div>
          ))}
        </Slider>
      </Box>
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
          star: PropTypes.number,
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
