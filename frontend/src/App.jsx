import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContextProvider } from "./context/UserContext";
import Pdf from "./pages/Pdf";
import Profile from "./pages/Profile";
import Invoices from "./pages/InvoiceList";
import EditInvoice from "./pages/EditInvoice";


const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/home"
            element={<ProtectedRoute Component={Home} />}
          />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/pdfgenerate"
            element={<ProtectedRoute Component={Pdf} />}
          />
          <Route
            exact
            path="/me"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            exact
            path="/allinvoice"
            element={<ProtectedRoute Component={Invoices} />}
          />
          <Route
            exact
            path="/editinvoice/:id"
            element={<ProtectedRoute Component={EditInvoice} />}
          />
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
