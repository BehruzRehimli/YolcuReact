import React, { useState } from 'react';
import {GiHamburgerMenu} from "react-icons/gi"

export default function App(props) {
  const [showNavExternal3, setShowNavExternal3] = useState(false);

  return (
        <div onClick={props.clickAction} className='burger-menu-con' style={{borderLeft:"1px solid #eff1f3",display:"none"}}>
            <GiHamburgerMenu style={{marginTop:"12px",marginLeft:"13px"}} fontSize="22px"  color='#ffa900'/>

        </div>
  );
}