import { Box, Grid } from "@mui/material";
const Table = ({ children }) => {
  return (
    <Box
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "14px !important",
          fontWeight: "400",
        },
        "& .MuiDataGrid-cell": {
          minHeight: "70px !important",
        },
        "& .MuiDataGrid-row": {
          minHeight: "70px !important",
          maxHeight: "70px !important",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgb(243, 245, 249)",
          borderBottom: "none",
          // paddingX: "15px",
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeader:focus,& .MuiDataGrid-cell": {
          outline: "none !important",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
             height: "60vh !important",
          "&::-webkit-scrollbar": {
            height: "4px",
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#344054",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(243, 245, 249)",
            borderRadius: "100px",
          },
        },
        "& .MuiCheckbox-root": {},
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {},
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 600,
        },
        "& .Mui-selected,& .MuiDataGrid-row:hover": {
          backgroundColor: "white !important",
        },
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
          {
            fontSize: "14px !important",
          },
        "& .MuiDataGrid-cellContent": {
          color: " rgb(125, 135, 156) !important",
        },
        "& .comment-column--cell": {
          fontSize: "12px !important",
        },
      }}
    >
      <Grid container>
        <Grid item xs={11.6} style={{ margin: "0 auto" }} px={1}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Table;

