import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
// Bootstrap CSS dosyasını https://reactstrap.github.io/?path=/docs/home-installation--page sayfasında belirtildiği gibi ekle.

function App() {
  return (
    <div className="container-full">
      <Header />
      <div className="content-wrapper">
        <div className="content">
          {/* MyCarousel componentını import et ve burada kullan */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
