import { Box, Stack, Avatar, Typography, useMediaQuery } from "@mui/material";
import {
  PendingActions,
  Inventory2,
  LocalShipping,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const OrderStatusStepper = ({ orderStatus = "Pending" }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  
  const statusSteps = [
    { key: "Pending", label: "Order Placed", icon: PendingActions },
    { key: "Processing", label: "Processing", icon: Inventory2 },
    { key: "Dispatched", label: "Dispatched", icon: LocalShipping },
    { key: "Delivered", label: "Delivered", icon: CheckCircle },
  ];

  const getStepIndex = (status) => {
    if (status === "Cancelled") return -1;
    return statusSteps.findIndex(step => step.key === status);
  };

  const currentStepIndex = getStepIndex(orderStatus);
  const isCancelled = orderStatus === "Cancelled";

  // Handle invalid status
  if (!orderStatus || (currentStepIndex === -1 && !isCancelled)) {
    return (
      <Box
        bgcolor="#fff"
        p={3}
        borderRadius={2}
        sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
      >
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Order status unavailable
        </Typography>
      </Box>
    );
  }

  if (isCancelled) {
    return (
      <Box
        bgcolor="#fff"
        p={3}
        borderRadius={2}
        sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: "#f44336", width: 48, height: 48 }}>
            <Cancel sx={{ color: "white" }} />
          </Avatar>
          <Typography variant="h6" color="#f44336">
            Order Cancelled
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      bgcolor="#fff"
      p={isMobile ? 2 : 3}
      borderRadius={2}
      sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        spacing={isMobile ? 2 : 0}
      >
        {statusSteps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrentStep = index === currentStepIndex;
          const IconComponent = step.icon;

          return (
            <Stack
              key={step.key}
              direction={isMobile ? "row" : "column"}
              alignItems="center"
              spacing={1}
              flex={isMobile ? "none" : 1}
              width={isMobile ? "100%" : "auto"}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={isMobile ? 2 : 0}
                width={isMobile ? "100%" : "auto"}
              >
                <Avatar
                  sx={{
                    bgcolor: isActive ? "primary.main" : "#DAE1E7",
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48,
                    border: isCurrentStep ? "2px solid" : "none",
                    borderColor: isCurrentStep ? "primary.main" : "transparent",
                  }}
                >
                  <IconComponent
                    sx={{
                      color: isActive ? "white" : "primary.main",
                      fontSize: isMobile ? 20 : 24,
                    }}
                  />
                </Avatar>

                {isMobile && (
                  <Typography
                    variant="subtitle2"
                    color={isActive ? "primary.main" : "text.secondary"}
                    fontWeight={isCurrentStep ? 600 : 400}
                  >
                    {step.label}
                  </Typography>
                )}

                {/* Connector line for mobile */}
                {isMobile && index < statusSteps.length - 1 && (
                  <Box
                    width="100%"
                    height="2px"
                    bgcolor={index < currentStepIndex ? "primary.main" : "#DAE1E7"}
                    ml="auto"
                  />
                )}
              </Stack>

              {/* Desktop labels */}
              {!isMobile && (
                <Typography
                  variant="caption"
                  color={isActive ? "primary.main" : "text.secondary"}
                  fontWeight={isCurrentStep ? 600 : 400}
                  textAlign="center"
                  mt={1}
                >
                  {step.label}
                </Typography>
              )}

              {/* Desktop connector line */}
              {!isMobile && index < statusSteps.length - 1 && (
                <Box
                  height="2px"
                  flex={1}
                  bgcolor={index < currentStepIndex ? "primary.main" : "#DAE1E7"}
                  mx={1}
                />
              )}
            </Stack>
          );
        })}
      </Stack>

      {/* Current status indicator */}
      <Box mt={2} textAlign="center">
        <Typography
          variant="body2"
          color="primary.main"
          sx={{
            bgcolor: "#FCE9EC",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            display: "inline-block",
          }}
        >
          Status: <strong>{orderStatus}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderStatusStepper;