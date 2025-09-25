import { Stack, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { products, cartTotal } = useSelector((state) => state.cart);

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Order Confirmation</Typography>
      <Stack spacing={1.5}>
        {products.map((product) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle">
              <span
                style={{
                  fontWeight: "500",
                  marginRight: "8px",
                }}
              >
                {`₦ ${product.price.toLocaleString()}`} X {product.count}
              </span>
              {`- ${product.name}`}
            </Typography>

            <Typography variant="subtitle1"> {`₦ ${product.total}`}</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Subtotal:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {`₦ ${cartTotal.toLocaleString()}`}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Shipping Fee:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            $0.00
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Discount:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            $0.00
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" color="text.primary">
          Total:
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          {`₦ ${cartTotal.toLocaleString()}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderDetails;
