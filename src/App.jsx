import { Route, Routes, useParams } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import BookDetails from "./components/book/BookDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/authSlice.js";
import Favourites from "./components/profile/Favourites.jsx";
import UserOrderHistory from "./components/profile/UserOrderHistory.jsx";
import Settings from "./components/profile/Settings.jsx";
import AllOrders from "./components/admin/AllOrders.jsx";
import AddBooks from "./components/admin/AddBooks.jsx";
import UpdateBook from "./components/admin/UpdateBook.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changedRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" theme="dark" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/all-books" element={<AllBooks />} />
        <Route
          exact
          path="/view-book-details/:bookid"
          element={<BookDetails />}
        />
        <Route exact path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBooks />} />
          )}
          {role === "admin" && (
            <Route
              path="/profile/update-book/:bookid"
              element={<UpdateBook />}
            />
          )}
          <Route path="/profile/orderhistory" element={<UserOrderHistory />} />
          <Route path="/profile/setting" element={<Settings />} />
        </Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/about-us" element={<AboutUs />} />
      </Routes>

      <Footer />
    </div>
  );
}
