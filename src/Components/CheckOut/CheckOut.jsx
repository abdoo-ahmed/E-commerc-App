import axios from 'axios'
import React, { useContext } from 'react'
import { CartContext } from '../AuthContext/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function CheckOut() {

    const {  ClearAllProduct , CartId} = useContext(CartContext)
    const navigate =useNavigate()
    function CheckOutCash(){
        const city = document.getElementById("city").value
        const phone = document.getElementById("phone").value
        const details = document.getElementById("details").value

        const shopingOpject={
            "shippingAddress":{
                "details": details ,
                phone,
                city
                }
        }
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}` , shopingOpject , {
            headers:{ token : localStorage.getItem("tkn") }
        })
        .then((res)=>{
            if(res.data.status == "success"){

              toast.success("Payment completed successfully..." , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})
              ClearAllProduct()
              setTimeout(
                ()=>{
                    navigate("/home")
                }, 1500)
            }

        })
        .catch((err)=>{
            console.log(err);
            toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})

        })

    }


    function ConfirmOnlinePay(){
        const city = document.getElementById("city").value
        const phone = document.getElementById("phone").value
        const details = document.getElementById("details").value

        const shopingOpject={
            "shippingAddress":{
                "details": details ,
                phone,
                city
                }
        }
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}` , shopingOpject , {
            headers:{ token : localStorage.getItem("tkn") } , params:{url:`http://localhost:3000`}
        })
        .then((res)=>{
            if(res.data.status == "success"){

                window.open( res.data.session.url , "_self" )

                //   toast.success("Payment completed successfully..." , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})
                //   ClearAllProduct()
                //   setTimeout(
                //     ()=>{
                //         navigate("/home")
                //     }, 1500)
            }

        })
        .catch((err)=>{
            console.log(err);
            toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})

        })
    }

  return <>
  
    <div className="inner_Pages">

        <div className="w-75 m-auto py-4">

            <label htmlFor="details" className='m-auto'>Details</label>
            <input style={{height:"40px"}} id='details' type="text" className='form-control mb-3' />
            

            <label htmlFor="phone">Phone</label>
            <input style={{height:"40px"}} id='phone' type="text" className='form-control mb-3' />

            <label htmlFor="city">City</label>
            <input style={{height:"40px"}} id='city' type="text" className='form-control mb-3' />

            <button onClick={CheckOutCash} className='w-100 mt-2 btn btn-primary'> Pay Now </button>
            <button onClick={ConfirmOnlinePay} className='w-100 mt-3 btn btn-primary'> Confirm Online Pay  </button>

        </div>
    </div>
  
  
  </>
}
