import React from "react";
import Logo from "./Logo";
import "./Homepage.css";
import img2 from "../Homepage/assets/images/img2.jpg";
import img3 from "../Homepage/assets/images/img3.jpg";



const Homepage = () => {
  return (
    <div className='container'>

<Logo />
<div className='container1'>
<img  src={img2} alt="img2" />
<img  src={img3} alt="img3" />
</div>
<div>
<h2 className='home-page'>WELCOME TO CYF SESSION </h2>
<button className='btn'>Get Started</button>
</div>
	</div>

  );
};

export default Homepage;




