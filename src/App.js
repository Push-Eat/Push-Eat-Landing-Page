import { Routes, Route } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Privacy from "./components/pages/Privacy";
import TermsService from "./components/pages/TermsService";
import ContactUs from "./components/pages/ContactUs";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home page – no Layout, but still has Navbar */}
        <Route path="/" element={<Home />} />

        {/* Other pages – wrapped in Layout (which has Footer + layout structure) */}
        <Route element={<Layout />}>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsService />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
