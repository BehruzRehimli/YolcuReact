import React, { useEffect, useState } from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom';
import {FaFacebookF,FaTwitter,FaInstagram,FaLinkedin,FaYoutube} from "react-icons/fa"
import {MdHeadsetMic} from "react-icons/md"
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  const [offices,setOffices]=useState([])

  useEffect(()=>{
    axios.get("http://bexarehimli-001-site1.htempurl.com/api/Offices/footer").then(response=>setOffices(response.data))
  },[]);
  return (
    <footer >
      <div className="my-container" style={{margin:"0 auto"}}>
        <div className="top-footer">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-xs-12">
              <ul>
                {
                  offices.slice(0,4).map(x=>{
                    return <li key={x.id}>
                    <Link to={`/office/${x.id}`}>{x.name}</Link>
                  </li>
                  })
                }
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
            <ul>
                {
                  offices.slice(4,8).map(x=>{
                    return <li key={x.id}>
                    <Link to={`/office/${x.id}`}>{x.name}</Link>
                  </li>
                  })
                }
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
            <ul>
                {
                  offices.slice(8,12).map(x=>{
                    return  <li key={x.id}>
                    <Link to={`/office/${x.id}`}>{x.name}</Link>
                  </li>
                  })
                }
              </ul>            
              </div>
            <div className="col-lg-3 col-md-6 col-xs-12">
            <ul>
                {
                  offices.slice(12,16).map(x=>{
                    return <li key={x.id}>
                    <Link to={`/office/${x.id}`}>{x.name}</Link>
                  </li>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="main-footer">
            <div className="row">
              <div className="col-lg-7 col-xs-7 left">
                <div className='text-start mt-5'>
                   <Link to="/"><img src="https://staticf.yolcu360.com/static/image/360-logo.svg" alt="Logo" /></Link>
                </div>
                <p className='mini-text'>Join the thousands of other customers who found their ideal vehicle at the best price with Yolcu360! No stress, hassle, just the perfect car.</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className='mt-2' style={{color:"#758493",textAlign:'left',fontWeight:"700",fontSize:"12px"}}>Social Media Accounts</p>
                    <div className='text-start mt-3'>
                      <a href=""><FaFacebookF color='#9b9b9b' fontSize="26px"/></a>
                      <a className='ms-3' href=""><FaTwitter color='#9b9b9b' fontSize="26px"/></a>
                      <a className='ms-3' href=""><FaInstagram color='#9b9b9b' fontSize="26px"/></a>
                      <a className='ms-3' href=""><FaLinkedin color='#9b9b9b' fontSize="26px"/></a>
                      <a className='ms-3' href=""><FaYoutube color='#9b9b9b' fontSize="26px"/></a>
                    </div>
                    <p className='mini-text mt-4' style={{fontWeight:700,fontSize:"10px"}}>YOLCU360 INC. ALL RIGHTS RESERVED.</p>
                  </div>
                  <div>
                  <p className='mt-2' style={{color:"#758493",textAlign:'left',fontWeight:"700",fontSize:"12px"}}>Mobile Apps</p>
                  <div>
                    <img width={"113px"} src='	https://staticf.yolcu360.com/static/image/app-store-en.png' alt='AppStore'/>
                    <img width={"113px"} className='ms-3'  src="https://staticf.yolcu360.com/static/image/google-play-en.png" alt="GooglePlay" />
                    <img width={"113px"} className='ms-3'  src="https://staticf.yolcu360.com/static/image/huawei-app-gallery-en.png" alt="GooglePlay" />
                  </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-xs-5 right">
              <p style={{color:"#758493",fontWeight:"700",fontSize:"13px",textAlign:"left",marginTop:"90px"}}>Do you need assistance with your booking?</p>
              <p style={{color:"#758493",fontWeight:"700",fontSize:"13px",textAlign:"left"}}>Contact Us.</p>
              <div className='d-flex justify-content-between' style={{marginTop:"35px"}}>
                <div className='d-flex align-items-end'>
                <MdHeadsetMic style={{color:"#ffa900",fontSize:"22px",marginBottom:"3px"}}/>
                <span style={{color:'#008dd4',marginLeft:"8px",fontSize:"14px",fontWeight:"700"}}>+1 888 774 7471</span>
                </div>
                <span style={{color:'#008dd4',fontSize:"14px",fontWeight:'700',marginRight:"7rem"}}>info@yolcu360.com</span>
              </div>
              <div className='d-flex justify-content-left align-item-end' style={{marginTop:"3rem"}}>
                <p style={{color:"#8d8d8d",fontSize:"10px",paddingRight:"12px",fontWeight:'600',textAlign:"left",marginBottom:"0",display:"flex",alignItems:"end"}}>Your payments are 100% secure with Yolcu360</p>
                <img height={"23px"} src="https://staticf.yolcu360.com/static/image/payment-methods@2x.png" alt="Visa" />             
              </div>
              </div>
            </div>
        </div>
        <div className="bottom-footer">
          <span className='mini-text'>About</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Help</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Privacy</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Personal Data Protection Law</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Contract</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>TV Advertisements</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Investment News</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Contact</span>
          <span className='mini-text' style={{borderLeft:"1.5px solid #999999",paddingLeft:"8px"}}>Blog</span>

        </div>
      </div>
    </footer>
  )
}

export default Footer