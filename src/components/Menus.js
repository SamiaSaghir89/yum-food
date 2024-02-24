import React, { useEffect, useRef, useState }  from 'react';
import { useDispatchCart,useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'; 
function Menus(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
 
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)

  return (
    <div className="card" style={{"width": "18rem","margin":"20px"}}>
      <img className="card-img-top"style={{height:"120px",objectFit:"contain"}}  alt = '--' src={props.ImgSrc}/>
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
        <p className="card-text"></p>
        <div className='container '>
          <select className='m-2 h-100 button rounded' onChange={(e)=>setQty(e.target.value)}>
            {
              Array.from(Array(6),(e,i)=>{
                return(
                  <option key={i+1} value={i+1}>{i+1}</option>
                )
              })
            }
          </select>
          
                 <select className='m-2 h-100 button rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
  {priceOptions.map((data) => (
    <option key={data} value={data}>{data}</option>
  ))}
</select>

            
      
        

        </div>
        
       <div className='d-inline h-100 fs-5'>
        {finalPrice}/-
       </div>
      </div>
      <button className=' button' onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default Menus;
