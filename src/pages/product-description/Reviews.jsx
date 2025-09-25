import { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Rating,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../features/product/productSlice";

const Reviews = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ star: 0, comment: "" });
  const auth = useSelector((state) => state.auth);
  const { productData } = useSelector((state) => state.product);
  const { user } = auth;
  const addComment = (event) => {
    event.preventDefault();
    axios
      .put(`${base_url}product/rating/${id}`, value, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        makeToast("success", "Thank you for your review!");
        setValue({ star: 0, comment: "" });
        dispatch(getProduct(id));
      })
      .catch((error) => {
        makeToast("error", "Something went wrong, Please try again");
      });
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  return (
    <Stack spacing={3}>
      <Stack spacing={2} maxWidth="600px">
        {productData?.ratings.map((rating, index) => (
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Avatar
                src={rating?.postedby?.image?.url}
                sx={{
                  height: "50px",
                  width: "50px",
                }}
              />
              <Stack>
                <Typography fontSize="16px" fontWeight="500">
                  {`${rating?.postedby?.fullName} `}
                </Typography>
                <Rating
                  value={rating?.star}
                  readOnly
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </Stack>
            </Stack>
            <Typography fontSize="13px" color="#4B566B">
              {rating?.comment}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h6">Write a Review for this product</Typography>
        <form onSubmit={addComment}>
          <Typography>
            Your Rating <span style={{ color: "red" }}>*</span>
          </Typography>
          <Rating
            value={value.star || 0}
            name="star"
            onChange={(event, newValue) => {
              setValue({ ...value, star: newValue });
            }}
            sx={{
              fontSize: "23px",
            }}
          />
          <Stack spacing={1}>
            <Typography>
              Your Review <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              name="review"
              value={value.comment}
              onChange={(event) => {
                setValue({ ...value, comment: event.target.value });
              }}
              multiline
              rows={7}
              placeholder="Write a review here..."
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Stack>
          <Button
            type="submit"
            disabled={!value.star || !value.comment || !user}
            sx={{
              textTransform: "none",
              bgcolor:
                !value.star || !value.comment || !user
                  ? "#0000001f"
                  : "primary.main",
              color: "white",
              fontSize: "14px",
              paddingX: "20px",
              fontWeight: 500,
              paddingY: "8px",
              alignSelf: "start",
              marginTop: "30px !important",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Stack>

      <Stack></Stack>
    </Stack>
  );
};
export default Reviews;
