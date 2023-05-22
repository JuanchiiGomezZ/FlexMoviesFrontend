import React, { useState, useEffect } from 'react';
import NavbarPC from '../views/Global/NavbarPC';
import NavbarMobile from '../views/Global/NavbarMobile';


const NavSelector = ()=> {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 820);
  if(isWideScreen){
    return(<NavbarPC/>)
  }else{
    return (<NavbarMobile/>)
  }

}

export default NavSelector

