import PropTypes from "prop-types";
import { Typography, Box, Stack, IconButton, Grid, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const IReview = ({ image, product, price, count, onDelete }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
        <Box
          component="img"
          src={image || "/placeholder.png"}
          alt={product?.name}
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            objectFit: "cover",
            borderRadius: 1,
          }}
        />

        <Stack spacing={0.5}>
          <Typography variant="subtitle1" color="text.primary" noWrap>
            {product?.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            £{price.toLocaleString()} x {count}
          </Typography>
        </Stack>
      </Stack>

      {onDelete && (
        <IconButton
          aria-label="Delete"
          color="error"
          onClick={onDelete}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Paper>
  );
};

IReview.propTypes = {
  image: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

const OrderedProducts = ({ order }) => {
  return (
    <Box mt={5}>
      <Stack
        py={2}
        px={3}
        sx={{
          background: "#F3F5F9",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="subtitle2">
                Order ID:
              </Typography>
              <Typography color="text.primary" variant="subtitle2">
                {order?.orderId}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="subtitle2">
                Placed on:
              </Typography>
              <Typography color="text.primary" variant="subtitle2">
                {new Date(order?.orderDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="subtitle2">
                Delivered on:
              </Typography>
              <Typography color="text.primary" variant="subtitle2">
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
        spacing={2}
        py={3}
        px={3}
        sx={{
          background: "white",
          borderRadius: 2,
        }}
      >
        {order?.products.map((review, index) => (
          <IReview key={index} {...review} />
        ))}
      </Stack>
    </Box>
  );
};

OrderedProducts.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    deliveryDate: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        product: PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
        }),
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderedProducts;
