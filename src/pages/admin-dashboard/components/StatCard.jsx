import { Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const StatCard = ({ title, value, icon, statusColor }) => (
    <Paper
        elevation={1}
        sx={{
            p: 4,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
        }}
    >
        <Box>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    color: statusColor ? `${statusColor}.main` : "text.primary",
                }}
            >
                {value}
            </Typography>
        </Box>
        <Box
            sx={{
                p: 2,
                borderRadius: "50%",
                bgcolor: statusColor ? `${statusColor}.lighter` : "grey.200",
                display: "flex",
            }}
        >
            <Typography variant="h5">{icon}</Typography>
        </Box>
    </Paper>
);

StatCard.propTypes = {
    title: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    icon: PropTypes.node.isRequired,
    statusColor: PropTypes.string,
};
