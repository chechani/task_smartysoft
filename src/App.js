import Login from "./Components/login";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/add_product";
import Footer from "./Components/footer";
import Head from "./Components/Head";
import Header from "./Components/header";
import NewSubTask from "./Components/newsubtask";
import PrivateComponent from "./Components/private_component";
import ProductList from "./Components/productList";
import SignIn from "./Components/signin";
import SignUp from "./Components/signup";
import SubTask from "./Components/subtask";
import Update from "./Components/update";
import { SignLanguage } from "@mui/icons-material";

function App() {
  return (
   <>
   <BrowserRouter>
   <Head/>
      {/* <Header /> */}
      <Routes>
        <Route element={<PrivateComponent />}>
        
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} /> 
          <Route path="/update/:name" element={<Update/>} />
          <Route path="/newsubtask/:my_to_do" element={<NewSubTask/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/subtask/:id" element={<SubTask/>} />
        </Route>
         <Route path="/login" element={<Login/>} />
         
         
          
      </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
