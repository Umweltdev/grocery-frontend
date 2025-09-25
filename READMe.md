# GROCERY ECOMMERCE PLATFORM

![Project License](https://img.shields.io/badge/license-MIT-blue.svg)
![Framework](https://img.shields.io/badge/framework-React-blue.svg)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/status-in%20progress-yellow)

A modern, responsive, and user-friendly frontend for a full-featured grocery e-commerce platform. Built with React and Vite, this application provides a seamless shopping experience from browsing to checkout.

**Live Demo:** [Link to your deployed site]

---

## 📸 Screenshots

*![Screenshot of the Grocery Ecommerce Platform homepage showing product listings and navigation.]*

---

## ✨ Key Features

* **User Authentication:** Secure user registration, login, and password reset functionality.
* **Dynamic Product Catalog:** Browse products, view detailed descriptions, and search for specific items.
* **Shopping Cart:** Add, remove, and update item quantities in the cart.
* **Wishlist:** Save favorite items for later.
* **Secure Checkout:** Integrated with Paystack for safe and reliable card payments.
* **Order History:** Users can view their past orders and track their status.
* **Responsive Design:** Fully functional and visually appealing on all devices, from mobile phones to desktops.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite
* **State Management:** Redux Toolkit
* **API Communication:** Axios
* **Styling:** Tailwind CSS / CSS Modules (or your choice)
* **Payment Gateway:** Paystack

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

* Node.js (v20 or later)
* npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/seunfolly/grocery-frontend.git](https://github.com/seunfolly/grocery-frontend.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd grocery-frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of the project and add the backend API URL. The `VITE_` prefix is required by Vite.

    ```env
    # .env.local
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## 🔗 API

This frontend application consumes a backend REST API. For more information, please visit the [backend repository](https://github.com/your-username/grocery-backend).
---

## 👤 Author

**Seun Folly** * **GitHub:** [@seunfolly](https://github.com/seunfolly)

## 👤 Owner

**Umweltdev** * **GitHub:** [@umweltdev](https://github.com/umweltdev)

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.