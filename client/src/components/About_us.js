import React from "react";
import "./About_us.css";
import Fatih from "./Homepage/assets/images/Fatih.png";
import Meron from "./Homepage/assets/images/Meron.png";
import Mohammed from "./Homepage/assets/images/Mohammed.png";
import Shimen from "./Homepage/assets/images/Shimen.png";
import Raj from "./Homepage/assets/images/Raj.png";
import Katie from "./Homepage/assets/images/Katie.png";
import Emily from "./Homepage/assets/images/Emily.jpg";

const About_us = () => {
  return (
    <div className="row">
        <h1>About us</h1>
        <p>Our class register web app project is designed to simplify the task of
          keeping track of cohort attendance and sessions. With its user-friendly interface,
          volunteers can easily create and manage class schedules and track attendance for each student.</p>
          <h2>Meet the team</h2>
          <h3>Codezilla</h3>
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