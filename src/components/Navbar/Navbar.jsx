import React, { useEffect, useRef, useState } from 'react'
import "./Navbar.css"
import { BsSearchHeart, BsFillGiftFill } from 'react-icons/bs'
import { BiSolidCar } from 'react-icons/bi'
import { RiUser3Fill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import LoginModal from '../Modal/LoginModal'
import RegisterModal from '../Modal/RegisterModal'
import { useSelector,useDispatch } from 'react-redux'
import { setToken,setUsername,logedYes,logedNo } from '../../control/loginSlice'
import jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom'

const Navbar = (props) => {

  const dispatch=useDispatch();
  const{username,isLogin,token}=useSelector(store=>store.login)

  const [login, setLogin] = useState(false)

  const [user, setUser] = useState({
    token: (localStorage.getItem("YolcuToken")),
    isLoged: false,
    username:''
  })

  const LogOutHanler=()=>{
    setUser(prev=>{return{...prev,token:null,isLoged:false}})
  }

  useEffect(()=>{
    var token=localStorage.getItem("YolcuToken");
    if (token && token.length>0) {
      dispatch(logedYes())
      dispatch(setToken(token))
      const decoded = jwt_decode(token);
      let user=decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      dispatch(setUsername(user))
    }
  },[])

  return (
    <nav className='my-navbar'>
      <div className='last-search my-nav-element'><BsSearchHeart style={{ color: "#2169aa", fontSize: "18px", fontWeight: 600 }} /></div>
      <div className=' my-nav-element menu-element'><BsFillGiftFill style={{ color: "#2169aa", fontSize: "18px", fontWeight: 600 }} /><span>Campaigns</span></div>
      <div className=' my-nav-element menu-element'><BiSolidCar style={{ color: "#2169aa", fontSize: "20px", fontWeight: 600 }} /><span>Find Reservation</span></div>
      <div onClick={(e) => { setLogin(!login) }} className={login ? ' my-nav-element menu-element active' : ' my-nav-element menu-element'}><RiUser3Fill style={{ color: "#2169aa", fontSize: "20px", fontWeight: 600 }} /><span>Login</span>
        <div className="valyuta-tab login text-start " style={login ? { display: 'Block',width:'auto' } : { display: 'none',width:"auto" }}>
          {
            isLogin ?
              <>
                <Link to={"/profile"} className='text-start bg-transparent border-0' style={{ color: "#03437f" }}>{username}</Link>
                <button onClick={()=>{
                  dispatch(logedNo())
                  dispatch(setToken(null))
                  dispatch(setUsername(null))
                  localStorage.setItem("YolcuToken",'')
                }} className="text-start last" style={{ color: "#ffa900" }}>Log Out</button>
              </> :
              <>
                <LoginModal user={user} setUser={setUser} />
                <RegisterModal />
              </>
          }
        </div>
      </div>




      <div className="my-nav-element menu-element valyuta-nav" style={props.valyuta ? { backgroundColor: "#ecf0ff" } : null} onClick={props.valyutaTab}><span className='valyuta'>{props.valyutaName}</span><IoIosArrowDown className='down-arrow' style={{ color: "#0e568c", marginLeft: "2px" }} />
        <div className="valyuta-tab " style={props.valyuta ? { display: 'Block' } : { display: 'none' }}>
          <p onClick={props.changeVal}>€ EUR</p>
          <p onClick={props.changeVal}>₺ TRY</p>
          <p onClick={props.changeVal}>$ USD</p>
          <p onClick={props.changeVal} className='last'>£ GBP</p>
        </div>
      </div>
      <div className="my-nav-element menu-element" style={props.language ? { backgroundColor: "#ecf0ff" } : null} onClick={props.languageTab}><span className='language valyuta'>{props.languageName}</span><IoIosArrowDown className='down-arrow' style={{ color: "#0e568c", marginLeft: "2px" }} />
        <div className="valyuta-tab language-tab" style={props.language ? { display: 'Block' } : { display: 'none' }}>
          <p onClick={props.changeLan} className='lan'>EN</p>
          <p onClick={props.changeLan} className='lan'>TR</p>
          <p onClick={props.changeLan} className='lan last'>DE</p>
        </div>
      </div>

    </nav>

  )
}

export default Navbar