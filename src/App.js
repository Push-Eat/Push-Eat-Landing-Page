import { Routes, Route } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Privacy from "./components/pages/Privacy";
import TermsService from "./components/pages/TermsService";
import ContactUs from "./components/pages/ContactUs";
import HomeContent from "./components/HomeContent";
import DeletePage from "./components/pages/DeletePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/delete-account" element={<DeletePage />} />
        </Route>
      </Routes>{" "}
      {/* <HomeContent /> */}
    </>
  );
}

export default App;
