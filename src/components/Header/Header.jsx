import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import {MdHeadsetMic} from 'react-icons/md'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import {FaUserPlus,FaUser,FaGift} from "react-icons/fa"
import {MdDirectionsCarFilled} from "react-icons/md"

const Header = () => {
  const [burgerMenu,setBurgerMenu]=useState(false);

  const BurgerMenuHandler=()=>{
    setBurgerMenu(!burgerMenu);
  }

  const [valyutaTab,setValyutaTab]=useState(false);
  const [languageTab,setLanguageTab]=useState(false);
  const [valyuta,setValyuta]=useState("$ USD");
  const [language,setLanguage]=useState("EN");
  const ValyutaTabOpenHandler=()=>{
    setValyutaTab(!valyutaTab);
    setLanguageTab(false)
  }
  const LanguageTabOpenHandler=()=>{
    setValyutaTab(false);
    setLanguageTab(!languageTab)
  }
  const ChangeTabHandler=(e)=>{
      setValyuta(e.target.innerHTML);
  }
  const ChangeLanguageHandler=(e)=>{
    setLanguage(e.target.innerHTML);
  }
  return (
    <header>
      <section className='top-header'>
          <div className='top-header-cont'>
          <div className='Logo-div'>
              <Link to="/"><img src="https://staticf.yolcu360.com/static/image/360-logo.svg" alt="Logo" /></Link>
          </div>
          <div className='top-header-right'>
          <Navbar valyutaName={valyuta} languageName={language} valyuta={valyutaTab} language={languageTab} changeLan={ChangeLanguageHandler} changeVal={ChangeTabHandler} valyutaTab={ValyutaTabOpenHandler} languageTab={LanguageTabOpenHandler}/> 
          <div className='call-center  nav-element'>
            <div className='left'><MdHeadsetMic style={{fontSize:"27px",color:"#ffa900"}} /></div>
            <div className="right ">
              <p>CALL CENTER</p>
              <div className="phone-number">+1 888 774 7471</div>
            </div>
          </div>
      <HamburgerMenu clickAction={BurgerMenuHandler} />

          </div>
          </div>
          <div className='burger-menu'  style={burgerMenu?{display:"block"}:{display:"none"} }>
              <li  className='nav-item'>
                <FaUserPlus style={{color:"#ffa900",fontSize:"20px"}}/>
                <span className='menu-element'>Register</span>
              </li>
              <li  className='nav-item'>
                <FaUser style={{color:"#2169aa",fontSize:"18px"}}/>
                <span className='menu-element'>Login</span>
              </li>
              <li  className='nav-item' >
                <MdDirectionsCarFilled   style={{color:"#2169aa",fontSize:"22px"}}/>
                <span style={{color:"#9b9b9b"}} className='menu-element'>Find Reservation</span>
              </li>
              <li  className='nav-item' >
                <FaGift   style={{color:"#2169aa",fontSize:"20px"}}/>
                <span style={{color:"#9b9b9b"}} className='menu-element'>Campaigns</span>
              </li>
              <li className='nav-item' style={{border:"none",display:"flex",gap:"15px"}}>
                <div className={`burger-menu-btn ${language==="TR"?"active":""}`} onClick={ChangeLanguageHandler}>TR</div>

                <div className={`burger-menu-btn ${language==="EN"?"active":""}`} onClick={ChangeLanguageHandler}>EN</div>
                <div className={`burger-menu-btn ${language==="DE"?"active":""}`} onClick={ChangeLanguageHandler}>DE</div>
              </li>
              <li className='nav-item' style={{border:"none",display:"flex",gap:"15px"}}>
                <div className={`burger-menu-btn ${valyuta==="€ EUR"?"active":""}`} onClick={ChangeTabHandler}>€ EUR</div>

                <div className={`burger-menu-btn ${valyuta==="₺ TRY"?"active":""}`} onClick={ChangeTabHandler}>₺ TRY</div>
                <div className={`burger-menu-btn ${valyuta==="$ USD"?"active":""}`} onClick={ChangeTabHandler}>$ USD</div>
                <div className={`burger-menu-btn ${valyuta==="£ GBP"?"active":""}`} onClick={ChangeTabHandler}>£ GBP</div>
              </li>
              <p style={{textAlign:"left",paddingLeft:"25px",marginTop:"30px",cursor:"pointer"}}>I have a promo code</p>
          </div>
          
      </section>
      {/* <div className='top-header-back'></div> */}

    </header>
  )
}

export default Header