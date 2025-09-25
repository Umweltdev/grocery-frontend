import {
  Typography,
  Box,
  Stack,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const IReview = ({ image, product, price, count }) => {
  return (
    <Grid container  sx={{
      rowGap: 2
    }}>
      <Grid item xs={12} md={2.8}>
        <Stack direction="row" spacing={2} flexGrow={1} alignItems="center">
          <img
            src={image}
            style={{
              width: "70px",
              height: "70px",
            }}
          />

          <Stack>
            <Typography variant="subtitle1" color="text.primary">
              {product?.name}
            </Typography>

            <Typography color="text.secondary" variant="subtitle2">
              {`₦ ${price} X ${count}`}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} md={7.2}>
        <Typography variant="subtitle2" color="text.secondary">
          {product?.description}
        </Typography>
      </Grid>

      <Grid item xs={12} md={2}>
        <Typography variant="subtitle2" color="primary.main">
          Write A Review
        </Typography>
      </Grid>

      {/* {icon && (
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      )} */}
    </Grid>
  );
};

const OrderedProducts = ({ order }) => {
  return (
    <Box
      mt={5}
      sx={{
        boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Stack
        // direction="row"
        // justifyContent="space-between"
        py={2}
        px={3}
        sx={{
          background: "#F3F5F9",
          borderTopRightRadius: "11px",
          borderTopLeftRadius: "11px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8} md={6}>
            <Stack direction="row" alignItems="center">
              <Typography
                color="text.secondary"
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
              >
                Order ID:{" "}
              </Typography>
              <Typography
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
                sx={{
                  color: "text.primary",
                }}
              >
                {order?.orderId}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Stack direction="row" alignItems="center">
              <Typography
                color="text.secondary"
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
              >
                Placed on:{" "}
              </Typography>
              <Typography
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
                sx={{
                  color: "text.primary",
                }}
              >
                {new Date(order?.orderDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center">
              <Typography
                color="text.secondary"
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
              >
                Delivered on:{" "}
              </Typography>
              <Typography
                variant="subtitle2"
                fontSize={{ xs: "12.5px", sm: "14px" }}
                sx={{
                  color: "text.primary",
                }}
              >
                {new Date(order?.deliveryDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Stack
        spacing={5}
        py={3}
        px={3}
        sx={{
          background: "white",
          borderBottomRightRadius: "11px",
          borderBottomLeftRadius: "11px",
        }}
      >
        {order?.products.map((review, index) => (
          <IReview key={index} {...review} />
        ))}
      </Stack>
    </Box>
  );
};

export default OrderedProducts;
