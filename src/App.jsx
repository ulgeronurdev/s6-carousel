import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import MyCarousel from "./components/MyCarousel"; // ✅ İMPORT TAMAM

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-full">
      <Header />
      <div className="content-wrapper">
        <div className="content">
          <MyCarousel /> {/* ✅ BURAYA EKLE, TEST BURAYI ARIYOR */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
