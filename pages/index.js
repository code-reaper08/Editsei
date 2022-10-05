import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className=" m-5">
      {/* Header */}
      <Header />
      {/* Editor */}
      <Main />
      {/* Footer */}
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
