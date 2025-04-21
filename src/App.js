import { Routes, Route } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Home from "./components/Home";
import Privacy from "./components/pages/Privacy";
import TermsService from "./components/pages/TermsService";
import ContactUs from "./components/pages/ContactUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/privacy"
        element={
          <Layout>
            <Privacy />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout>
            <TermsService />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactUs />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
