// import React, { useState, useEffect } from "react";
// import "./About_us.css";
// import Fatih from "../components/Homepage/assets/images/Fatih.PNG";
// import Shimen from "../components/Homepage/assets/images/Shimen.PNG";
// import Meron from "../components/Homepage/assets/images/Meron.PNG";
// import Mohammed from "../components/Homepage/assets/images/Mohammed.PNG";
// import Katie from "../components/Homepage/assets/images/Katie.PNG";
// import Raj from "../components/Homepage/assets/images/Raj.PNG";
// //import Emily from "../components/Homepage/assets/images/Emily.PNG";

// const teamMembers = [
// 	{
// 		id: 1,
// 		name: "Fatih",
// 		position: "FULL-STACK DEVELOPER",
// 		linkedin: "https://www.linkedin.com/in/fatih-celebi-5460a4229/",
// 		image: { Fatih },
// 	},
// 	{
// 		id: 2,
// 		name: "Shimen",
// 		position: "FULL-STACK DEVELOPER",
// 		linkedin: "https://www.linkedin.com/in/shimenafshar/",
// 		image: { Shimen },
// 	},
// 	{
// 		id: 3,
// 		name: "Meron",
// 		position: "FULL-STACK DEVELOPER",
// 		linkedin: "https://www.linkedin.com/in/meron-gebremichael-8531b2243/",
// 		image: { Meron },
// 	},
// 	{
// 		id: 4,
// 		name: "Mohammed",
// 		position: "FULL-STACK DEVELOPER",
// 		linkedin: "https://www.linkedin.com/in/mohammadreza-nafar-669507239/",
// 		image: { Mohammed },
// 	},
//     {
//     id: 5,
//     name: "Katie",
//     position: "Product Manager",
//     image: { Katie },
//     },
//     {
//         id: 6,
//         name: "Raj",
//         position: "TA",
//         image: { Raj },
//     },
//     // {
//     //     id: 7,
//     //     name: "Emily",
//     //     position: "TA",
//     //     image: require(Emily),
//     // },

// ];

// function About_us () {
//   const [showMembers, setShowMembers] = useState(false);
//   const [showProject, setShowProject] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowMembers(true);
//     }, 2000);
//   }, []);

//   useEffect(() => {
//     if (showMembers) {
//       setTimeout(() => {
//         setShowProject(true);
//       }, 2000);
//     }
//   }, [showMembers]);

//   return (
//     <div style={{ backgroundColor: "black", minHeight: "100vh" }} className="about_cont">
//       <div style={{ padding: "20px", color: "black" }}>
//         <h1 style={{ textAlign: "center" }}>WHO WE ARE</h1>
//         <p style={{ textAlign: "center", fontSize: "28px" }}>
// We are a group named Codezilla.
//         </p>
//       </div>

//       {showMembers && (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           {teamMembers.map((member) => (
//             <div key={member.id} style={{ textAlign: "center", margin: "20px" }}>
//               <img
//                 src={member.image.default}
//                 alt={member.name}
//                 style={{ width: "150px", height: "150px", borderRadius: "50%" }}
//               />
//               <h3>
//                 <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
//                   {member.name}
//                 </a>
//               </h3>
//               <p>{member.position}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {showProject && (
//         <>
//           <h2 style={{ textAlign: "center", marginTop: "100px", color: "white" }}>OUR PROJECT</h2>
//           <p style={{ textAlign: "center", color: "white", fontSize: "28px" }}>
// Our Project is based on Class Register for CYF.
//           </p>
//         </>
//       )}
//     </div>
//   );
// }

// export default About_us;
