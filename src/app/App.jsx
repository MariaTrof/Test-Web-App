import * as React from "react";
import { Route, Routes } from "react-router-dom";
import CertificateList from "../pages/CertificateList/CertificateList";
import ContactPage from "../pages/ContactPage/ContactPage";
import PayPage from "../pages/PayPage/PayPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MainPage from "../pages/MainPage/MainPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/select" element={<CertificateList />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<MainPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
