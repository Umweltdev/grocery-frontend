import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import {
  Box,
  Stack,
  Grid,
  Container,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Tab from "./Tab";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";
import { getProducts } from "../../features/product/productSlice";
import ICard from "../../components/ui-elements/Card";

import makeToast from "../../utils/toaster";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { itemArray, Item, item1Array, Item1 } from "./data";

const ProductDescription = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [productDetails, setProductDetails] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const productState = useSelector((state) => state.product.products);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const cartProduct = products.find(
    (product) => product.id === productDetails?._id
  );

  const getProduct = () => {
    axios
      .get(`${base_url}product/${id}`)
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productDetails._id,
        image: productDetails.images[0].url,
        price: productDetails.pricing?.finalPrice ||
          (productDetails.salePrice
            ? productDetails.salePrice
            : productDetails.regularPrice),
        name: productDetails.name,
      })
    );
    makeToast("success", "Added to Cart");
  };

  const handleRemoveCart = (id) => {
    dispatch(decreaseQuantity(id));
    makeToast("error", "Remove from Cart");
  };

  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbnailSliderRef.current,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow:
      productDetails?.images.length < 4 ? productDetails?.images.length : 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSliderRef.current,
  };
  const addToWishList = () => {
    axios
      .put(`${base_url}product/wishlist/${productDetails?._id}`, null, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => {
        setToggle(!toggle);
      })
      .catch(() => {
        makeToast("error", "You must be logged. Sign in");
      });
  };

  if (productDetails === null) {
    return (
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          height: "100vh",
        }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    productDetails !== null && (
      <>
        <Header />

        <Box
          sx={{
            bgcolor: "#F6F9FC",
            paddingY: "40px",
            // paddingX: 1
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  gap: 1,
                }}
              >
                <div>
                  <Slider {...settings} ref={mainSliderRef}>
                    {productDetails?.images.map((image) => (
                      <div key={image._id}>
                        <img
                          src={image?.url}
                          alt={`Image ${image._id}`}
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                  <Box
                    mt={2}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Slider {...thumbnailSettings} ref={thumbnailSliderRef}>
                      {productDetails?.images.map((image) => (
                        <div key={image._id} className="thumbnail-item">
                          <img
                            src={image.url}
                            alt={`Thumbnail ${image._id}`}
                            className="desc-carousel-image"
                            // style={{ width: "130px", height: "auto" }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </Box>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h5">{productDetails?.name}</Typography>
                  <Stack spacing={0.5} alignItems="flex-start">
                    {/* Final / real price */}
                    <Typography variant="h5" color="primary.main">
                      £{" "}
                      {productDetails?.pricing?.finalPrice ||
                        (productDetails?.salePrice
                          ? productDetails?.salePrice
                          : productDetails?.regularPrice)}
                    </Typography>

                    {/* Show discount if available */}
                    {productDetails?.pricing?.discount > 0 && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          fontSize="14px"
                          sx={{ textDecoration: "line-through" }}
                        >
                          £ {productDetails?.regularPrice}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          RCD Discount: -
                          {productDetails.pricing.discount.toFixed(1)}%
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  <Stack direction="row" spacing={5}>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle1">Brand: </Typography>
                      <Typography variant="subtitle1">Reference: </Typography>
                      {productDetails?.stock <= 0 ? (
                        <Typography
                          variant="subtitle2"
                          color="white"
                          p={0.4}
                          px={2}
                          sx={{
                            backgroundColor: "#E3364E",
                            borderRadius: "10px",
                            marginTop: "10px !important",
                          }}
                        >
                          Out Of Stock
                        </Typography>
                      ) : (
                        <Typography variant="subtitle1">In Stock: </Typography>
                      )}
                    </Stack>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle2">
                        {productDetails?.brand?.name || "No Brand"}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {productDetails?.productId}
                      </Typography>
                      {productDetails?.stock > 0 && (
                        <Typography variant="subtitle2" color="text.secondary">
                          {`${productDetails?.stock} Items`}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  <Typography variant="subtitle2" color="text.secondary">
                    {productDetails?.description}
                  </Typography>

                  <Box
                    sx={{
                      padding: "13px 0",
                      borderWidth: "1px 0",
                      borderStyle: "dashed",
                      borderColor: "#ddd",
                      display: "flex",
                      gap: "15px",
                      // margin: 30px 0;
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                        padding: "0 8px",
                        width: "110px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        disabled={productDetails?.stock <= 0}
                        onClick={() => handleRemoveCart(productDetails._id)}
                      >
                        <ExpandMoreIcon
                          sx={{
                            cursor: "pointer",
                            fontSize: "25px",
                            "&:hover": {
                              color: "#E3364E",
                            },
                          }}
                        />
                      </IconButton>

                      {cartProduct?.count && cartProduct?.count > 0 ? (
                        <Typography variant="subtitle1">
                          {cartProduct?.count}
                        </Typography>
                      ) : (
                        0
                      )}

                      <IconButton
                        disabled={productDetails?.stock <= 0}
                        onClick={() => handleAddToCart()}
                      >
                        <ExpandLessIcon
                          sx={{
                            fontSize: "25px",

                            "&:hover": {
                              color: "#E3364E",
                            },
                          }}
                        />
                      </IconButton>
                    </Box>

                    <Button
                      disabled={productDetails?.stock <= 0}
                      onClick={() => handleAddToCart()}
                      sx={{
                        textTransform: "none",
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: "14px",
                        paddingX: isNonMobile ? "25px" : "13px",
                        fontWeight: 600,
                        paddingY: "12px",
                        alignSelf: "start",
                        display: "flex",
                        gap: "10px",
                        borderRadius: "16px",
                        "&:hover": {
                          backgroundColor: "#E3364E",
                        },
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                      <Typography variant="subtitle1"> Add To Cart</Typography>
                    </Button>

                    <Tooltip
                      title={
                        toggle ? "Remove from wishlist" : "Add to wishlist"
                      }
                    >
                      <IconButton
                        onClick={() => addToWishList()}
                        sx={{
                          backgroundColor: toggle ? "#D23F57" : "#e9ecef",
                          borderRadius: "16px",
                          paddingX: "12px",
                          color: toggle ? "white" : "black",
                          "&:hover": {
                            backgroundColor: "#D23F57",
                            color: "white",
                          },
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Stack direction="row" spacing={5}>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle1">Category: </Typography>
                      <Typography variant="subtitle1">Tags: </Typography>
                    </Stack>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {productDetails?.category?.name}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {productDetails?.tags.join(", ")}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={2}>
                    {item1Array.map((item, index) => (
                      <Item1 key={index} {...item} />
                    ))}
                  </Stack>

                  {/* <Stack spacing={1} alignItems="center" direction="row">
                  <Typography variant="subtitle2">Rating:</Typography>
                  <Rating
                    value={productDetails?.totalstar || 2}
                    readOnly
                    sx={{
                      fontSize: 20,
                      // alignItems: "center",
                    }}
                  />
                  <Typography variant="subtitle2">{`(${productDetails?.totalrating})`}</Typography>
                </Stack> */}

                  {/* </Stack> */}
                </Stack>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{
                my: 6,
              }}
            >
              {itemArray.map((item, index) => (
                <Grid key={index} item xs={6} md={3}>
                  <Item {...item} />
                </Grid>
              ))}
            </Grid>
            <Tab product={productDetails} />

            <Stack
              spacing={2}
              sx={{
                my: 7,
              }}
            >
              <Typography variant="h6" fontSize="20px">
                Related Products
              </Typography>
              <Grid
                container
                spacing={3}
                sx={{
                  width: "calc(100% + 24px)",
                  marginLeft: "-24px !important",
                }}
              >
                {productState.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item._id}>
                    <ICard {...item} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Box>
        <Footer />
      </>
    )
  );
};

export default ProductDescription;
