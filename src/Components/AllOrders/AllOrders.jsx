import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'


export default function AllOrders() {
    const [AllOrders, setAllOrders] = useState(null)
    function GetUserOrders(){
        const userID = localStorage.getItem('userID')
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
        .then((res)=>{
            setAllOrders(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        GetUserOrders()
    })
    if(!AllOrders){

        return <>
    
        <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">
    
            <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
    
        </div>
        
        
        </>

    }

    

  return <>

    <div className="container inner_Pages">

        <div className="products">

        <div className="row mt-2 gy-3">
            {AllOrders.map((order, index)=>{
                
                return <>
                
                    <div key={index} className="col-md-6 ">

                        <div className="order h-100">

                            <div className="container">

                                <div className="row">

                                    {order.cartItems.map((item , ind)=>{
                                        return <>
                                        
                                        <div key={ind} className="col-md-4">
                                        <div className="El_montag h-100">
                                            <img className='mt-3 w-100' src={item.product.imageCover} alt={item.product.title} />
                                            <h5 className='text-center text-main'> {item.product.title}</h5>
                                            <h6>price : <span className='text-main'>{item.price} EGP</span> </h6>
                                            <h6>count : <span className='text-main'>{item.count}</span> </h6>
                                        
                                        </div>
                                        </div>
                                        
                                        </>
                                    })}
                                    
                                </div>
                            </div>





                            <h5>
                                Payment Method : <span className='text-main'>{order.paymentMethodType}</span>
                            </h5>
                            <h5>
                                Order price : <span className='text-main'>{order.totalOrderPrice} EGP</span>
                            </h5>
                            <p>
                                This order is delivering to <span className='text-main'>{order.shippingAddress.city} </span> 
                                on phone number : <span className='text-main'>{order.shippingAddress.phone} </span> 
                                with details : <span className='text-main'>{order.shippingAddress.details}</span>
                            </p>
                        </div>

                    </div>
                
                </>
            })}
            
        </div>
        </div>
       
    </div>
  
  
  
  </>
}
