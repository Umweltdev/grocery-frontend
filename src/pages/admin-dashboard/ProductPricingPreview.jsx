import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { calculateFinalPrice } from "../../utils/pricingUtils";

const ProductPricingPreview = ({
  products,
  mcdConfig,
  rcdConfig,
  sampleSpend = 200,
  sampleVisits = 3,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dynamic Product Pricing Preview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          See how MCD and RCD affect your product prices in real-time.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <Chip
            label={`MCD: ${mcdConfig?.enabled ? "On" : "Off"}`}
            color={mcdConfig?.enabled ? "primary" : "default"}
          />
          <Chip
            label={`RCD: ${rcdConfig?.enabled ? "On" : "Off"}`}
            color={rcdConfig?.enabled ? "success" : "default"}
          />
          <Chip label={`Sample Spend: $${sampleSpend}`} />
          <Chip label={`Sample Visits: ${sampleVisits}`} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Base Price</TableCell>
                <TableCell align="center">MCD Price</TableCell>
                <TableCell align="center">RCD Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                const { basePrice, mcdPrice, rcdPrice } = calculateFinalPrice({
                  basePrice: product.basePrice,
                  mcdConfig,
                  rcdConfig,
                  customerSpend: sampleSpend,
                  customerVisits: sampleVisits,
                });

                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="center">
                      ${basePrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        color={mcdConfig?.enabled ? "primary" : "inherit"}
                      >
                        ${mcdPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="success.main">
                        ${rcdPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

ProductPricingPreview.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  mcdConfig: PropTypes.object.isRequired,
  rcdConfig: PropTypes.object.isRequired,
  sampleSpend: PropTypes.number,
  sampleVisits: PropTypes.number,
};

export default ProductPricingPreview;
