import { useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import makeToast from "../../utils/toaster";
import { Formik } from "formik";
import * as yup from "yup";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
    },
    "&:hover fieldset": {
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

const AddBrand = () => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const { id } = useParams();
  const dispatch = useDispatch();
  const brandState = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    updatedBrand,
    brandData,
  } = brandState;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "create") {
      dispatch(getABrand(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      makeToast("success", "Brand Added Sucessfully!");
      resetFormRef.current();
      dispatch(resetState());
    }
    if (isSuccess && updatedBrand) {
      makeToast("success", "Brand Updated Successfullly!");
      navigate("/admin/brands");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const initialValues = {
    name: brandData?.name || "",
    isFeatured: brandData?.isFeatured || false,
  }
  return (
    <Box
      bgcolor="background.paper"
      px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 4 }}
      sx={{
        height: "calc(100vh - 75px)",
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontSize={{xs: "19px",  sm:"21px"}}>
          {id === "create" ? "Create Brand" : "Edit Brand"}
        </Typography>
        <Paper
          elevation={0}
          
          sx={{
            borderRadius: "8px",
            bgcolor: "white",
            padding: isNonMobile ? 6 : 3,
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            height:  isNonMobile ? "auto":"300px"
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              if (id !== "create") {
                const data = { id: id, brandData: values };
                dispatch(updateABrand(data));

                // resetFormRef.current = resetForm;
              } else {
                dispatch(createBrand(values));
                resetFormRef.current = resetForm;
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputLabelProps={{
                      width: isNonMobile ? "250px" : "100%",

                    }}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isFeatured}
                      onChange={(e) => {
                        setFieldValue("isFeatured", e.target.checked);
                      }}
                      name="isFeatured"
                      sx={{
                        fontSize: "16px",
                        "&.Mui-checked": {
                          color: "#4e97fd",
                        },
                        "&:hover": {
                          color: "#4e97fd",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 25 },
                        "& .MuiTypography-body1": {
                          fontSize: "16px",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography component="span" sx={{ fontSize: "15px" }}>
                      Featured Brand
                    </Typography>
                  }
                />
                <Button
                  type="submit"
                  disabled={!isValid || (!dirty && id === "create") || isLoading}
                  sx={{
                    textTransform: "none",
                    bgcolor:
                      !isValid || (!dirty && id === "create") || isLoading
                        ? "#0000001f"
                        : "#4e97fd",
                    color: isLoading ? "#00000042" : "white",
                    fontSize: "14px",
                    paddingX: "15px",
                    fontWeight: 400,
                    paddingY: "5px",
                    alignSelf: "start",
                    borderRadius: "8px",
                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "#2756b6",
                    },
                  }}
                >
                                    {isLoading ? "Loading..." : "Save Brand"}

                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};
const validationSchema = yup.object({
  name: yup
    .string()
    .required("required")
    .min(3, "Name must be at least 3 characters"),
});
export default AddBrand;
