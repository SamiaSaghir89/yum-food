import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'


function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.lenth ===0){
        return(
            <div className='m-5 w-100 text-center fs-3'>The Cart Is Empty</div>
        )
    }
    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch('https://yum-food-efc9.onrender.com/api/orderData',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        }
      
        );
        console.log("Orders Response",response)
        if(response.status ===200){
            dispatch({type:"DROP"})
        }
    }
    let totalPrice = data.reduce((total,food)=> total +food.price,0)
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm tabel-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>

                        <th scope='col'>img</th>

                    </tr>
                </thead>
                <tbody>
                {data.map((food, index) => {
    return (
        <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td>{food.name}</td>
            <td>{food.qty}</td>
            <td>{food.size}</td>
            <td>{food.price}</td>
            <td>{food.img}</td>

            <td>
                <button type='button' className='btn p-0'>
                    <img
                        src='.../th.jpeg'
                        alt='delete'
                        onClick={() => {
                            dispatch({ type: 'REMOVE', index: index });
                        }}
                    ></img>
                </button>
            </td>
        </tr>
    );
})}

                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price:{totalPrice}</h1></div>
            <div>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    </div>
  )
}

export default Cart