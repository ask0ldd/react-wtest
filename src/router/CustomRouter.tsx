import { BrowserRouter, Routes, Route } from "react-router";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Home from "../pages/Home";

function CustomRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page1" element={<Page1/>} />
                <Route path="/page2" element={<Page2/>} />
            </Routes>
        </BrowserRouter>
      );
  }
  
  export default CustomRouter