import React from "react";
import "./About_us.css";
import Fatih from "./Homepage/assets/images/Fatih.png";
import Meron from "./Homepage/assets/images/Meron.png";
import Mohammed from "./Homepage/assets/images/Mohammed.png";
import Shimen from "./Homepage/assets/images/Shimen.png";
import Raj from "./Homepage/assets/images/Raj.png";
import Katie from "./Homepage/assets/images/Katie.png";
import Emily from "./Homepage/assets/images/Emily.jpg";
//import Group from "./Homepage/assets/images/Group.png";

const About_us = () => {
  return (
    <div className="row">

			{/* <img src={Group} alt="group" /> */}
        <h1>Meet the team</h1>
        <h2>Codezilla</h2>
      <div className="column">
        <div className="card">
          <img src={Fatih} alt="fatih" />
          <a
            href="https://www.linkedin.com/in/fatih-celebi-5460a4229/"
            className="primary"
          ><h3>Fatih</h3>
          </a>
          <h5>
FullStack Developer
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Meron} alt="meron" />
          <a
            href="https://www.linkedin.com/in/meron-gebremichael-8531b2243/"
            className="primary"
          ><h3>Meron</h3>
          </a>
          <h5>
FullStack Developer
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Mohammed} alt="mohammad" />
          <a
            href="https://www.linkedin.com/in/mohammadreza-nafar-669507239/"
            className="primary"
          ><h3>Mohammad</h3>
          </a>
          <h5>
FullStack Developer
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Shimen} alt="shimen" />
          <a
            href="https://www.linkedin.com/in/shimenafshar/"
            className="primary"
          ><h3>Shimen</h3>
          </a>
          <h5>
FullStack Developer
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Raj} alt="raj" />
          <h3>Raj</h3>
          <h5>
TA
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Katie} alt="raj" />
          <h3>Katie</h3>
          <h5>
Product Manager
          </h5>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <img src={Emily} alt="emily" />
          <h3>Emily</h3>
          <h5>
TA
          </h5>
        </div>
      </div>
    </div>
  );
};
export default About_us;