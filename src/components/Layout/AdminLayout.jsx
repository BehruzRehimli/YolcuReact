import React, { useEffect, useState } from 'react'
import "./AdminStyle.css"
import Logo from "../../images/images/logo-light-icon.png"
import MainLogo from "../../images/images/logo-text.png"
import DarkLogo from '../../images/images/logo-icon.png'
import User1 from "../../images/images/users/1.jpg"
import { Outlet, Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setAdminToken,setUsername,adminLogedNo, setAdminUsername } from '../../control/loginSlice'
import { useNavigate } from 'react-router-dom'



const AdminLayout = () => {
    const dispatch= useDispatch();
    const navigate=useNavigate();

    const { adminLogin, adminUsername } = useSelector(store => store.login)

    const [loader,setLoader]=useState(false)
    const [userloader,setUserLoader]=useState(false)


    useEffect(()=>{
        setLoader(true)
    },[adminLogin])
    useEffect(()=>{
        setUserLoader(true)
    },[adminUsername])


    return (
        <div>
            <div className="preloader">
                <div className="loader">
                    <div className="loader__figure"></div>
                    <p className="loader__label">Elegant admin</p>
                </div>
            </div>
            {/* <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== --> */}
            <div id="main-wrapper">
                {/* <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== --> */}
                <header className="topbar">
                    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                        {/* <!-- ============================================================== --> */}
                        {/* <!-- Logo --> */}
                        {/* <!-- ============================================================== --> */}
                        <div className="navbar-header">
                            <a className="navbar-brand" href="index.html">
                                {/* <!-- Logo icon --> */}
                                <b>
                                    {/* <!--You can put here icon as well // <i className="wi wi-sunset"></i> //--> */}
                                    {/* <!-- Dark Logo icon --> */}
                                    <img src={DarkLogo} alt="homepage" className="dark-logo" />
                                    {/* <!-- Light Logo icon --> */}
                                    <img src={Logo} alt="homepage" className="light-logo" />
                                </b>
                                {/* <!--End Logo icon --> */}
                                {/* <!-- Logo text --> */}
                                <span>
                                    {/* <!-- dark Logo text --> */}
                                    <img src={MainLogo} alt="homepage" className="dark-logo" />
                                    {/* <!-- Light Logo text -->     */}
                                    <img src={Logo} className="light-logo" alt="homepage" /></span> </a>
                        </div>
                        {/* <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== --> */}
                        <div className="navbar-collapse">
                            {/* <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== --> */}
                            <ul className="navbar-nav mr-auto">
                                {/* <!-- This is  --> */}
                                <li className="nav-item hidden-sm-up"> <a className="nav-link nav-toggler waves-effect waves-light" href="#"><i className="ti-menu"></i></a></li>
                                {/* <!-- ============================================================== -->
                        <!-- Search -->
                        <!-- ============================================================== --> */}
                                <li className="nav-item search-box"> <a className="nav-link waves-effect waves-dark" href="#"><i className="fa fa-search"></i></a>
                                    <form className="app-search">
                                        <input type="text" className="form-control" placeholder="Search &amp; enter" /> <a className="srh-btn"><i className="fa fa-times"></i></a>
                                    </form>
                                </li>
                            </ul>
                            <ul className="navbar-nav my-lg-0">
                                {/* <!-- ============================================================== -->
                        <!-- User profile and search -->
                        <!-- ============================================================== --> */}
                                <li className="nav-item dropdown">

                                    <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark d-flex" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            loader ?
                                                <div className='me-3 text-start'>
                                                    <p style={{ lineHeight: "14px", fontSize: "14px", marginTop: "7px" }}>{userloader?adminUsername:null}</p>
                                                    <p onClick={()=>{
                                                        dispatch(setAdminToken(''))
                                                        dispatch(setAdminUsername(''))
                                                        dispatch(adminLogedNo())
                                                        localStorage.removeItem("YolcuAdmin")
                                                        navigate("/admin/login")
                                                    }} style={{ color: "#f25658", fontSize: "14px", lineHeight: "14px", marginTop: "-10px", marginBottom: "0" }}>Logout</p>
                                                </div> : null

                                        }

                                        <img src={User1} alt="user" className="img-circle" style={{ width: "50px", height: "50px" }} />

                                    </a>
                                </li>
                                {/* <!-- ============================================================== -->
                        <!-- User profile and search -->
                        <!-- ============================================================== --> */}
                            </ul>
                        </div>
                    </nav>
                </header>
                {/* <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== --> */}
                <aside className="left-sidebar">
                    <div className="d-flex no-block nav-text-box align-items-center">
                        <span><img src={Logo} alt="elegant admin template" /></span>
                        <a className="waves-effect waves-dark ml-auto hidden-sm-down" ><i className="ti-menu"></i></a>
                        <a className="nav-toggler waves-effect waves-dark ml-auto hidden-sm-up" ><i className="ti-menu ti-close"></i></a>
                    </div>
                    {/* <!-- Sidebar scroll--> */}
                    <div className="scroll-sidebar">
                        {/* <!-- Sidebar navigation--> */}
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li> <Link className="waves-effect waves-dark" to={"/admin"} aria-expanded="false"><i className="fa fa-tachometer"></i><span className="hide-menu">Dashboard</span></Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/country"} aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu">Country</span></Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/type"} aria-expanded="false"><i className="fa fa-table"></i><span className="hide-menu"></span>Type</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/brand"} aria-expanded="false"><i className="fa fa-smile-o"></i><span className="hide-menu"></span>Brand</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/rent"} aria-expanded="false"><i className="fa fa-smile-o"></i><span className="hide-menu"></span>Rent</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/city"} aria-expanded="false"><i className="fa fa-globe"></i><span className="hide-menu"></span>City</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/office"} aria-expanded="false"><i className="fa fa-bookmark-o"></i><span className="hide-menu"></span>Office</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/model"} aria-expanded="false"><i className="fa fa-question-circle"></i><span className="hide-menu"></span>Model</Link></li>
                                <li> <Link className="waves-effect waves-dark" to={"/admin/car"} aria-expanded="false"><i className="fa fa-table"></i><span className="hide-menu"></span>Car</Link></li>
                                {
                                    adminUsername==="SuperAdmin"?
                                    <li> <Link className="waves-effect waves-dark" to={"/admin/admin"} aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu"></span>Admin</Link></li>
                                    :console.log(adminUsername)
                                }
                            </ul>
                        </nav>
                        {/* <!-- End Sidebar navigation --> */}
                    </div>
                    {/* <!-- End Sidebar scroll--> */}
                </aside>
                {/* <!-- ============================================================== -->
        <!-- End Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper  -->
        <!-- ============================================================== --> */}
                <div className="page-wrapper">
                    {/* <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== --> */}
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                    {/* <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== --> */}
                </div>
                {/* <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- footer -->
        <!-- ============================================================== --> */}
                <footer className="footer">
                    © 2018 Elegent Admin by wrappixel.com
                </footer>
                {/* <!-- ============================================================== -->
        <!-- End footer -->
        <!-- ============================================================== --> */}
            </div>
            {/* <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== --> */}
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            {/* <!-- Bootstrap popper Core JavaScript --> */}
            <script src="../assets/node_modules/popper/popper.min.js"></script>
            <script src="../assets/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            {/* <!-- slimscrollbar scrollbar JavaScript --> */}
            <script src="dist/js/perfect-scrollbar.jquery.min.js"></script>
            {/* <!--Wave Effects --> */}
            <script src="dist/js/waves.js"></script>
            {/* <!--Menu sidebar --> */}


            {/* <!-- ============================================================== -->
    <!-- This page plugins -->
    <!-- ============================================================== -->
    <!--morris JavaScript --> */}
            <script src="../assets/node_modules/raphael/raphael-min.js"></script>
            <script src="../assets/node_modules/morrisjs/morris.min.js"></script>
            <script src="../assets/node_modules/jquery-sparkline/jquery.sparkline.min.js"></script>
            {/* <!--c3 JavaScript --> */}
            <script src="../assets/node_modules/d3/d3.min.js"></script>
            <script src="../assets/node_modules/c3-master/c3.min.js"></script>
            {/* <!-- Chart JS --> */}
            <script src="dist/js/dashboard1.js"></script>


        </div>
    )
}

export default AdminLayout