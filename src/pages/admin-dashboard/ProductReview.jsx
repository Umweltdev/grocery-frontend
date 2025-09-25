import { useState, useEffect } from "react";
import { Stack, Typography, IconButton, Paper, Switch } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts
} from "../../features/product/productSlice";
import Table from "./Table";
const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img src={row.image} alt={value} width={40} height={40} />{" "}
      <Typography variant="subtitle2" color=" #7d879c">
        {value}
      </Typography>
    </Stack>
  );
};

const columns = [
  { field: "name", headerName: "Name", width: 200, renderCell: renderNameCell },
  {
    field: "customer",
    headerName: "Customer",
    width: 160,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 500,
    headerAlign: "center",
    align: "center",
    cellClassName: "comment-column--cell",
  },
  // {
  //   field: "publish",
  //   headerName: "Published",
  //   width: 120,

  //   renderCell: ({ value, row }) => {
  //     const [checked, setChecked] = useState(value);

  //     const handleSwitchChange = () => {
  //       const updatedRow = { ...row, publish: !checked };
  //       setChecked(!checked);
  //     };

  //     return (
  //       <Switch
  //         checked={checked}
  //         onChange={handleSwitchChange}
  //         sx={{
  //           "& .MuiSwitch-thumb": {
  //             color: "#2756b6",
  //           },
  //           "& .Mui-checked+.MuiSwitch-track": {
  //             backgroundColor: "#4e97fd !important",
  //           },
  //         }}
  //       />
  //     );
  //   },
  // },

  {
    field: "action",
    headerName: "Action",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <IconButton aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    ),
  },
];
const ProductReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, []);
  const {products} = useSelector((state) => state.product);

  const productData = products.reduce((result, product) => {
    const { productId, name, images, ratings, _id } = product;
    const productRatings = ratings.map((rating) => ({
      _id: _id,
      id: uuidv4(),
      name: name,
      image: images[0]?.url,
      customer: rating.postedby.fullName,
      comment: rating.comment,
      action: null,
    }));
    return result.concat(productRatings);
  }, []);
  
  return (
    <Stack spacing={3} bgcolor="background.paper" py={4}>
      <Typography variant="h6" fontSize="21px" px={3}>
        Product Reviews
      </Typography>
      <Paper elevation={0}>
        <Table>
          <DataGrid
            rows={productData}
            columns={columns}
            style={{ height: "100%" }}
          />
        </Table>
      </Paper>
    </Stack>
  );
};

export default ProductReviews;
