import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";

function CustomRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/page1" element={<Page1/>} />
                <Route path="/page2" element={<Page2/>} />
            </Routes>
        </BrowserRouter>
      );
  }
  
  export default CustomRouter