import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const { currentUser } = useContext(AuthContext);

  // Define state variables for each number
  const [experience, setExperience] = useState(0);
  const [awards, setAwards] = useState(0);
  const [properties, setProperties] = useState(0);

  // Function to handle the count-up animation
  const countUp = (target, setState, duration) => {
    let start = 0;
    const increment = target / duration;

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setState(Math.floor(start));
    }, 20); // Update the number every 20ms
  };

  // Use useEffect to start the counting animation when the component mounts
  useEffect(() => {
    countUp(16, setExperience, 150); // 1500ms for smooth animation
    countUp(200, setAwards, 150);
    countUp(1000, setProperties, 150);
  }, []);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>{experience}+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>{awards}+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>{properties}+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg (2).png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
