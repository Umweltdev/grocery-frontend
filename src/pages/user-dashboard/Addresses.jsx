import { useEffect } from "react";
import { Typography, Stack, Button, Paper, IconButton } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  getAddresses,
} from "../../features/address/addressSlice";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";


const Address = ({ _id, fullName, address, phone, state }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Paper
      elevation={0}
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        bgcolor: "white",
        borderRadius: "10px",
        alignItems: "center",
        textTransform: "capitalize",
        gap: 1,
        flexWrap: "wrap",
        flexDirection: isNonMobile? "row" : "column",
        columnGap: 1.5,
        // justifyContent: "space-between"
      }}
    >
      <Typography variant="subtitle2" flex={"1 1 0"} whiteSpace="pre"
>
        {fullName}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 0" whiteSpace="pre">
        {phone}
      </Typography>

      <Typography variant="subtitle2" flex={{xs:"1 1 0",sm:"1 1 200px"}} whiteSpace="pre">
        { ` ${address} ${state} State`}
      </Typography>
      {/* <Typography variant="subtitle2" flex="1 1 0">
        { ` ${state} State`}
      </Typography> */}
      <Stack direction="row" justifyContent="end">
        <Link
          to={`/user/addresses/${_id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <EditIcon
              sx={{
                fontSize: "1.8rem",
              }}
            />
          </IconButton>
        </Link>

        <IconButton
          onClick={() => {
            dispatch(deleteAddress(_id));
          }}
        >
          <DeleteIcon
            sx={{
              fontSize: "1.8rem",
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const Addresses = ({openDrawer}) => {
  const dispatch = useDispatch();
  const { addresses, deletedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAddresses());
    };
    fetchData();
  }, [deletedAddress]);
  return (
    <Stack spacing={2}>
      <Header
        Icon={PlaceIcon}
        title={"My Addresses"}
        openDrawer={openDrawer}
        button="Add New Address"
        link={`/user/addresses/new`}
      />

      <Stack spacing={2}>
        {addresses.map((address, index) => (
          <Address {...address} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Addresses;
