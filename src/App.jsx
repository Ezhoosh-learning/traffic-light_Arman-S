import { useEffect, useState } from "react";
import greenLight from "./asset/greenLight.jpg";
import redLight from "./asset/redLight.jpg";
import yellowLight from "./asset/yellowLight.jpg";
import { useRef } from "react";

function App() {
  const [img, setimg] = useState(greenLight);
  const [time, settime] = useState();
  const counter = useRef(null)
  const image = useRef(null)

  let intervalId ; 
  let num; 

  useEffect(() => {
    counter.current.innerText = "please wait"
    image.current.src = redLight;
    image.current.src = yellowLight;
    image.current.src = greenLight;
    setTimeout(() => {
    counter.current.innerText = ""
      greenCount();
    }, 2000);
  }, []);

  function greenCount() {
    timer("green")
    colorCounter("green")
    setTimeout(() => {
      setimg(yellowLight);
      clearInterval(intervalId)
      yellowCount("green");
    }, 9000);
  }
  function yellowCount(pervius) {
    timer("yellow")
    colorCounter("yellow")
    setTimeout(() => {
      if(pervius == "green"){
      clearInterval(intervalId)
      setimg(redLight);
      redCount();
      }else if(pervius == "red"){
        clearInterval(intervalId)
        setimg(greenLight);
        greenCount()
      }
    }, 4000);
  }
  function redCount() {
    timer("red")
    colorCounter("red")
    setTimeout(() => {
      setimg(yellowLight);
      clearInterval(intervalId)
      yellowCount("red");
    }, 11000);
  }

  function formatTime(n){
    if (n < 10)
    return "00"+ ":" + "0" + n;

    if(n<0)
    return "00:00";

    return "00:" + n
    
  }

    function colorCounter(color){
      if(color == "green"){
      counter.current.style.color = "#46D365"
      }else if(color == "yellow"){
      counter.current.style.color = "#F6D201"
      }else if(color == "red"){
      counter.current.style.color = "#F02E2F"
      }
    }
  function timer(color){
    num = 0
    intervalId = setInterval(() => {
      if(color == "green"){
        settime(formatTime(8-num))
        num++
      }else if(color == "yellow"){
        settime(formatTime(3-num))
        num++
      }else if(color == "red"){
        settime(formatTime(10-num))
        num++
      }
    }, 1000);
  }
  return (
    <>
      <div className="container">
        <div className="img-main">
          <img className="image" ref={image} src={img} alt="traffic-light" />
        </div>
        <div className="counter-main">
          <p className="counter" ref={counter}>{time}</p>
        </div>
      </div>
    </>
  );
}

export default App;
