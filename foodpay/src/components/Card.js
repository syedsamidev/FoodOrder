import React, {useRef, useState, useEffect} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [Qty, setQty] = useState(1);
  const [Size, setSize] = useState("");

  const priceRef = useRef();

  const handleAddToCart= async()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

    console.log(food);
    console.log(new Date());

    if (food.lenght !== 0) {
      if (food.Size === Size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: Qty })
        return
      }
      else if (food.Size !== Size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: Qty, size: Size,img: props.foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: Qty, size: Size });
    console.log(data);
  }

  let finalPrice = Qty * parseInt(options[Size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div>
          <div className="card mt-3" style={{width: "18rem", maxHeight: "360px"}}>
            <img 
              src={props.foodItem.img}
              className="card-img-top" 
              alt="..."
              style={{ width: "100%", height: "150px" }} // Adjust the width and height as needed
            />
            <div className="card-body">
              <h5 className="card-title">{props.foodItem.name}</h5>
              <div className="container w-100">
                <select className='m-2 h-100 bg-info rounded' onChange={(e)=>{setQty(e.target.value)}}>
                {Array.from(Array(6),(e,i) => {
                  return (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  )
                })}
                </select>
                <select className='m-2 h-100 bg-info rounded' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                  { priceOptions.map((data)=>{
                    return ( <option key={data} value={data}> {data} </option>)
                  })}
                </select>
                <div className='d-inline h-100 fs-5'>
                  Rs. {finalPrice}/-
                </div>
                
              </div>
              <hr/>
              <button className='btn btn-info justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
    </div>
  )
}
