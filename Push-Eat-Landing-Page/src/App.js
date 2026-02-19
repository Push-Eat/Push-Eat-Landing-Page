import { Routes, Route } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Navbar from "./components/Navbar";
import ParticleCursor from "./components/ParticleCursor";
import Home from "./components/Home";
import Privacy from "./components/pages/Privacy";
import TermsService from "./components/pages/TermsService";
import ContactUs from "./components/pages/ContactUs";
import DeletePage from "./components/pages/DeletePage";
import DealPage from "./components/pages/DealPage";
import ScrollToTop from "./components/UI/ScrollToTop";
import Faq from "./components/pages/Faq";

function App() {
  return (
    <>
      <ParticleCursor />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/delete-account" element={<DeletePage />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
        <Route path="/deal/:dealId" element={<DealPage />} />
      </Routes>
    </>
  );
}

export default App;
