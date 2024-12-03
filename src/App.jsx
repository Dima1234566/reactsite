import Home from "./Pages/Home/Home";
import Library from "./Pages/Library/Library";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
