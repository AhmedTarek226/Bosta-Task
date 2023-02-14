import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Tracking from "./Tracking/Tracking";
import Notfound from "./Notfound";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
