import Swal from "sweetalert2";

// This function creates a temporary, centered SUCCESS modal.
const makeToast = (type, msg) => {
  Swal.fire({
    position: "top",
    icon: type,
    title: msg,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      title: 'custom-swal-title',
    }
  });
};

// This function creates a persistent, centered ERROR modal.
export const makeErrorAlert = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: msg,
    confirmButtonColor: "#d33",
    customClass: {
      title: 'custom-swal-title',
      htmlContainer: 'custom-swal-text'
    }
  });
};

export default makeToast;