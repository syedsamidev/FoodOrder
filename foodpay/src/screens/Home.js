import React,{useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/fooddata",{
      method: "POST",
      headers: {
        "Content-Type":"application/json" 
      },
    });

    const jsonData = await response.json();
    //console.log("Received data:", jsonData);

    // Extracting food data and category data from the response
    const foodData = jsonData.data;
    const categoryData = jsonData.catData;

    // Update state with the extracted data
    setfoodItem(foodData);
    setfoodCat(categoryData);
  }

  useEffect(() => {
    loadData();
  }, [])
  

  return (
    <div>
        <div><Navbar/></div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex: "2"}}>
              <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                  {/* <button className="btn btn-info" type="submit">Search</button> */}
              </div>
          </div>
          <div className="carousel-inner">
              <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?pasta" className="d-block w-100" alt="..." style={{objectFit: "contain !important"}}/>
              </div>
              <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..."/>
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
        </div>
        <div className='container'>
          { foodCat.length !== 0 ? foodCat.map((data)=>{
            return (<div className='row mb-3'>
            <div key={data._id} className='fs-4 m-3'>
              {data.CategoryName}
              </div>
              <hr/>
              { foodItem.length !== 0 ? foodItem.filter((item)=> (item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))))
              .map(filterItems=>{
                return (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <div><Card foodItem = {filterItems} options= {filterItems.options[0]}
                    /></div>
                  </div>
                )
              })
              : "" }
            </div>)
          }) : "Nothing to view"}

        </div>
        <div><Footer/></div>
    </div>
  )
}
