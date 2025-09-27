import { Stack, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { products, cartTotal } = useSelector((state) => state.cart);

  return (
      <>
        <Stack spacing={2}>
          {products.map((product) => (
            <Stack
              key={product.id || product._id || product.name}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                bgcolor: "#f9f9f9",
                p: 2,
                borderRadius: "8px",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "#f1f1f1" },
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, fontSize: "15px" }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                £{product.price.toLocaleString()} × {product.count} = £
                {product.total.toLocaleString()}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              £{cartTotal.toLocaleString()}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Shipping Fee
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              £0.00
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Discount
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              £0.00
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            £{cartTotal.toLocaleString()}
          </Typography>
        </Stack>
      </>
  );
};

export default OrderDetails;
