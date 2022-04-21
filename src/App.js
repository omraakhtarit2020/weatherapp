import { useState } from "react";
import './App.css';


function App() {
  const[cityname,setCityname]=useState("")
  const[storeData,setStoreData]=useState()
  const[seen,setSeen]=useState(false)
  const[imgOf,setImgOf]=useState()
  const currDay=new Date().toDateString();
  const[error,setError]=useState(false)
  // const currMonth=new Date().getMonth();
  // const currYear=new Date().getFullYear();
  const handleClick=async()=>{
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=eb2413db33394e7adf8505c412e28489&units=metric`
      const response=await fetch(url)
      const result=await response.json();
      console.log(result)
      setStoreData(result)
      if(result.weather[0].main=="Haze"){
        setImgOf("https://cdn-icons-png.flaticon.com/512/1197/1197102.png")
      }
      else if(result.weather[0].main=="Clouds"){
       setImgOf("https://cdn-icons-png.flaticon.com/512/4064/4064269.png")
      }
      else if(result.weather[0].main=="Rain"){
       setImgOf("https://cdn-icons-png.flaticon.com/512/1146/1146858.png")
      }
      else if(result.weather[0].main=="Clear"){
       setImgOf("https://cdn-icons.flaticon.com/png/512/2374/premium/2374598.png?token=exp=1650490499~hmac=c8745d16868c5666312df8465490866f")
      }
      else if(result.weather[0].main=="Sunny"){
       setImgOf("https://cdn-icons-png.flaticon.com/512/869/869869.png")
      }
      else if(result.weather[0].main=="Smoke"){
        setImgOf("https://cdn-icons.flaticon.com/png/512/5324/premium/5324642.png?token=exp=1650490985~hmac=a070fbff48d92a0b1433c49dd64d9b01")
      }
      else if(result.weather[0].main=="Mist"){
        setImgOf("https://cdn-icons-png.flaticon.com/512/4005/4005817.png")
      }
      setSeen(true)
      setError(false)
      setCityname("")
    }catch(e){
      setError(true)
      setSeen(false)
      setCityname("")
      console.log(e)
      return;

    }
  
  }
  const enterCity=(e)=>{
    setCityname(e.target.value)
  }
  return (
    <div className='container d-flex justify-content-center align-items-center height'>
       <div className="card mb-3" style={{width:"540px"}}>
       {error&&<div className="alert alert-danger text-center" role="alert">
              City Not Found!
     </div>}
        <div className="row g-0">
           <div className="col-md-4">
           {seen &&
            <div className='newdes'>
            <img src={imgOf} className='newdes2'/>
            </div>}
          </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title text-center">Weather Check</h5>
        <input type="text"  className="form-control" value={cityname} placeholder='Enter City Name' onChange={(e)=>enterCity(e)}/>
        <div className="d-flex justify-content-center align-items-center  mt-2">
          <button className='btn btn btn-dark m-auto ' onClick={handleClick}>Search</button>
        </div>
        {seen && <><p className="card-text fs-4 text fw-bolder">{storeData.name},{storeData.sys.country}</p>
        <p className="card-text ">{currDay}</p>
        <h1>{storeData.main.temp}° C</h1>
        <p className="card-text fw-bold">{storeData.weather[0].main}</p>
        <p className="card-text">Humidity : {storeData.main.humidity}%</p>
        <p className="card-text">Pressure : {storeData.main.pressure} hPa</p></>}
        
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
