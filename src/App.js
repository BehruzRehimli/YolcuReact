import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import Office from "./pages/Office/Office";
import Cars from "./pages/Cars/Cars"
import Detail from "./pages/Detail/Detail"
import AdminLayout from './components/Layout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Country from './pages/Admin/Country/Country';
import CountryCreate from './pages/Admin/Country/CountryCreate';
import Login from './pages/Admin/Login';
import CountryEdit from './pages/Admin/Country/CountryEdit';
import Type from './pages/Admin/Type/Type';
import TypeCreate from './pages/Admin/Type/TypeCreate';
import TypeEdit from './pages/Admin/Type/TypeEdit';
import Brand from './pages/Admin/Brand/Brand';
import BrandCreate from './pages/Admin/Brand/BrandCreate';
import BrandEdit from './pages/Admin/Brand/BrandEdit';
import City from './pages/Admin/City/City';
import CityCreate from './pages/Admin/City/CityCreate';
import CityEdit from './pages/Admin/City/CityEdit';
import OfficeAdmin from "./pages/Admin/Office/Office"
import OfficeCreate from './pages/Admin/Office/OfficeCreate';
import OfficeEdit from './pages/Admin/Office/OfficeEdit';
import Model from './pages/Admin/Model/Model';
import ModelCreate from './pages/Admin/Model/ModelCreate';
import ModelEdit from './pages/Admin/Model/ModelEdit';
import Car from './pages/Admin/Car/Car';
import CarCreate from './pages/Admin/Car/CarCreate';
import CarEdit from './pages/Admin/Car/CarEdit';
import Error from './pages/Error/Error';
import CarDetail from './pages/CarDetail/CarDetail';
import RentInfo from './pages/RentInfo/RentInfo';
import Profile from './pages/Profile/Profile';
import ResetPasword from './pages/ResetPasword/ResetPasword';
import Admin from './pages/Admin/Admin/Admin';
import AdminCreate from './pages/Admin/Admin/AdminCreate';
import AdminEdit from './pages/Admin/Admin/AdminEdit';
import Rent from './pages/Admin/Rent/Rent';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/office/:id' element={<Office/>}/>
            <Route path="/cars/:id" element={<Cars/>}/>
            <Route path='/detail/:id' element={<Detail/>}>
              <Route path='/detail/:id/car' element={<CarDetail/>}/>
              <Route path='/detail/:id/rentinfo' element={<RentInfo/>}/>

            </Route>
            <Route path="/profile" element={<Profile/>}/>
            <Route path='/error' element={<Error/>}/>
            <Route path='/resetpasword/:id/:token' element={<ResetPasword/>}/>

          </Route>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin' element={<Dashboard/>}/>
            <Route path='/admin/country' element={<Country/>}/>
            <Route path='/admin/country/create' element={<CountryCreate/>}/>
            <Route path='/admin/country/edit/:id' element={<CountryEdit/>}/>
            <Route path='/admin/type' element={<Type/>}/>
            <Route path='/admin/type/create' element={<TypeCreate/>}/>
            <Route path='/admin/type/edit/:id' element={<TypeEdit/>}/>
            <Route path='/admin/brand' element={<Brand/>}/>
            <Route path='/admin/brand/create' element={<BrandCreate/>}/>
            <Route path='/admin/brand/edit/:id' element={<BrandEdit/>}/>
            <Route path='/admin/city' element={<City/>}/>
            <Route path='/admin/city/create' element={<CityCreate/>}/>
            <Route path='/admin/city/edit/:id' element={<CityEdit/>}/>
            <Route path='/admin/office' element={<OfficeAdmin/>}/>
            <Route path='/admin/office/create' element={<OfficeCreate/>}/>
            <Route path='/admin/office/edit/:id' element={<OfficeEdit/>}/>
            <Route path='/admin/model' element={<Model/>}/>
            <Route path='/admin/model/edit/:id' element={<ModelEdit/>}/>
            <Route path='/admin/model/create' element={<ModelCreate/>}/>
            <Route path='/admin/car' element={<Car/>}/>
            <Route path='/admin/car/create' element={<CarCreate/>}/>
            <Route path='/admin/car/edit/:id' element={<CarEdit/>}/>
            <Route path='/admin/admin' element={<Admin/>}/>
            <Route path='/admin/admin/create' element={<AdminCreate/>}/>
            <Route path='/admin/admin/edit/:id' element={<AdminEdit/>}/>
            <Route path='/admin/rent' element={<Rent/>}/>

          </Route>
          <Route path='/admin/login' element={<Login/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
