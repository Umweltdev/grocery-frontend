import { useEffect, useRef, useState } from "react";
import { Box, TextField, styled, MenuItem, IconButton } from "@mui/material";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});
const Dropdown = ({
  setCategoryLevels,
  categoryLevels,
  selectedCategories,
  setSelectedCategories,
  setFieldValue,
  field,
  errors,
  editMode,
  categoryId,
}) => {
  const [renderKey, setRenderKey] = useState(0);
  const [touch, setTouched] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:968px)");

  const handleCategoryChange = (index, categoryId, setFieldValue) => {
    setRenderKey((prevKey) => prevKey + 1);
    const updatedSelectedCategories = selectedCategories.slice(0, index);
    updatedSelectedCategories.push(categoryId);
    setSelectedCategories(updatedSelectedCategories);
    setCategoryLevels(categoryLevels.slice(0, index + 1));
    setFieldValue(field, categoryId); // Set the 'parent' field value using Formik setFieldValue
    fetchSubCategories(categoryId, index + 1);
  };

  const removeCategoryDropdown = (index, setFieldValue) => {
    const updatedSelectedCategories = selectedCategories.slice(0, index);
    const updatedCategoryLevels = categoryLevels.slice(0, index);
    setSelectedCategories(updatedSelectedCategories);
    setCategoryLevels(updatedCategoryLevels);
    setFieldValue(
      `category-level-${index - 1}`,
      updatedSelectedCategories[index - 1] || ""
    );
  };

  const fetchSubCategories = (categoryId, index) => {
    axios
      .get(`${base_url}category/${categoryId}`)
      .then((response) => {
        const updatedCategoryLevels = [...categoryLevels];
        updatedCategoryLevels[index] = response.data.children;
        setCategoryLevels(updatedCategoryLevels);
      })
      .catch((error) => console.log(error));
  };

  const renderCategoryDropdown = (level, index, setFieldValue) => {
    if (level.length === 0) {
      return null; // Don't render the dropdown if the level is empty
    }
    const fieldName =
      index === categoryLevels.length - 1 ? field : `category-level-${index}`;
    return (
      <Box position="relative" sx={{
        width: isNonMobile?  "250px" : "100%",

      }}>
        <CustomTextField
          select
          label={`Select Category`}
          fullWidth
          variant="outlined"
          onChange={(event) =>
            handleCategoryChange(index, event.target.value, setFieldValue)
          }
          value={selectedCategories[index] || ""}
          name={fieldName}
          onBlur={() => {
            if (fieldName === "category") setTouched(true);
          }}
          error={touch && !!errors.category}
          helperText={touch && errors.category}
          key={fieldName}
          InputLabelProps={{
            style: { fontSize: "15px" },
          }}
          sx={{
            width:  "100%",

          }}
        >
          {level.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </CustomTextField>
        {index > 0 && (
          <IconButton
            onClick={() => removeCategoryDropdown(index, setFieldValue)}
            sx={{
              marginLeft: "10px",
              position: "absolute",
              top: "-10px",
              right: "-20px",
              padding: "3px",
            }}
          >
            <CloseIcon
              sx={{
                fontSize: ".9rem",
              }}
            />
          </IconButton>
        )}
      </Box>
    );
  };
  

  useEffect(() => {
    if (editMode && categoryId) {
      setSelectedCategories([]);
      setCategoryLevels([]);

      axios
        .get(`${base_url}category/${categoryId}`)
        .then((response) => {
          const categoryData = response.data;
          const categoryLevel = categoryData.level;
  
          axios
            .get(`${base_url}category?level=${categoryLevel}`)
            .then((response) => {
              setCategoryLevels([response.data]);
              let updatedSelectedCategories = [];
              updatedSelectedCategories.push(categoryId);
              setSelectedCategories(updatedSelectedCategories);
  
              if (categoryData.parent) {
                fetchAncestorCategories(categoryData.parent._id, updatedSelectedCategories);
              }
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
    
  }, [editMode, categoryId ]);
  
  const fetchAncestorCategories = (parentId, updatedSelectedCategories) => {
    axios
      .get(`${base_url}category/${parentId}`)
      .then((response) => {
        const parentCategory = response.data;
        updatedSelectedCategories.unshift(parentCategory._id);
  
        axios
          .get(`${base_url}category?level=${response.data.level}`)
          .then((response) => {
            const ancestorCategories = response.data;
            setCategoryLevels((prevCategoryLevels) => {
              const updatedCategoryLevels = [...prevCategoryLevels];
              updatedCategoryLevels.unshift(ancestorCategories);
              return updatedCategoryLevels;
            });
  
            if (parentCategory.parent) {
              fetchAncestorCategories(parentCategory.parent._id, updatedSelectedCategories);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {categoryLevels.map((level, index) =>
        renderCategoryDropdown(level, index, setFieldValue)
      )}
    </>
  );
};

export default Dropdown;