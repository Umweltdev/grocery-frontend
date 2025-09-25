import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Chip,
  styled,
  Container,
  Stack,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Header from "../../components/layouts/Header";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";
import OrderConfirmationPage from "./orderConfirmationPage";
import PaymentPage from "./paymentPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#d23f57",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#d23f57",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#fce9ec",
    borderTopWidth: 4,
    borderRadius: 1,
  },
}));

const steps = ["Cart", "Checkout", "Order Confirmation", "Payment"];

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");
  const { products } = useSelector((state) => state.cart);

  const [completedSteps, setCompletedSteps] = useState({
    Cart: false,
    Checkout: false,
    "Order Confirmation": false,
    Payment: false,
  });

  const handleNext = () => {
    const isValid = validateStep(steps[activeStep]);
    if (!isValid) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case "Cart":
        return completedSteps.Cart;
      case "Checkout":
        return completedSteps.Checkout;
      case "Order Confirmation":
        return completedSteps["Order Confirmation"];
      case "Payment":
        return completedSteps.Payment;
      default:
        return false;
    }
  };

  const updateStepCompletion = (step) => {
    if (!steps.includes(step)) {
      return;
    }
    setCompletedSteps((prevCompletedSteps) => ({
      ...prevCompletedSteps,
      [step]: true,
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case "Cart":
        return <CartPage updateStepCompletion={updateStepCompletion} />;
      case "Checkout":
        return <CheckoutPage updateStepCompletion={updateStepCompletion} />;
      case "Order Confirmation":
        return (
          <OrderConfirmationPage updateStepCompletion={updateStepCompletion} />
        );
      case "Payment":
        return <PaymentPage updateStepCompletion={updateStepCompletion} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Header />
      <Box
        paddingY={{ xs: 2, sm: 5 }}
        paddingX={{ xs: 1, sm: 0 }}
        paddingBottom={{ xs: 6, sm: 5 }}
        sx={{
          bgcolor: "#F6F9FC",
        }}
      >
        <Container maxWidth="lg">
          <Stepper
            activeStep={activeStep}
            connector={<QontoConnector />}
            sx={{
              width: isNonMobile ? "60%" : "95%",
              margin: "0 auto",
              display: Mobile ? "flex" : "none",
            }}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                sx={{
                  padding: 0,

                  "& .MuiStepLabel-iconContainer": {
                    display: "none",
                  },
                }}
              >
                <StepLabel>
                  <Chip
                    label={`${index + 1}. ${label}`}
                    component="button"
                    clickable
                    onClick={() => setActiveStep(index)}
                    disabled={index === activeStep || !validateStep(label)}
                    sx={{
                      fontSize: "14px",
                      color:
                        index === activeStep || completedSteps[label]
                          ? "white"
                          : "#d23f57",
                      bgcolor:
                        index === activeStep || completedSteps[label]
                          ? "#d23f57"
                          : "#fce9ec",
                      "& .MuiChip-label": {
                        paddingX: "20px",
                      },
                      "&.Mui-disabled": {
                        opacity: 1,
                      },
                      "&:hover": {
                        bgcolor: "#d23f57",
                        color: "white",
                      },
                    }}
                  />
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(steps[activeStep])}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            width={{ xs: "100%", md: "66%" }}
            mt={4}
            sx={
              {
                // width: "66%",
              }
            }
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                textTransform: "none",
                opacity: activeStep === 0 ? 0 : 1,
                flex: 1,
              }}
            >
              {activeStep === 0 ? "" : `Back to ${steps[activeStep - 1]}`}
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                flex: 1,
                opacity: activeStep === steps.length - 1 ? 0 : 1,
              }}
              onClick={handleNext}
              disabled={
                activeStep === steps.length - 1 ||
                !validateStep(steps[activeStep]) ||
                products.length === 0
              }
            >
              {activeStep === steps.length - 1
                ? "Finish"
                : `Proceed to ${steps[activeStep + 1]}`}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Cart;
