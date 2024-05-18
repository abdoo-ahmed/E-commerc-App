import axios from 'axios'
import React, { useContext } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { CartContext } from '../../AuthContext/CartContext'
import toast from 'react-hot-toast'



export default function ProductDetails(){

  const {AddProductToCard} = useContext(CartContext);
  
  async function AddProduct(id){
        const res= await AddProductToCard(id)
        console.log(res);
        
        if(res.status === "success"){

            toast.success("It has been successfully added. 🛺" , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})
            
        }
        else{
            
            toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})

        }
    } 

   const {id}= useParams()
   
    function ProductDetails(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ id }`)

    }

  const {isLoading , data , isError} = useQuery(`productDetails-${id}` ,ProductDetails );
    
    if(isLoading){
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
    if(isError){
        <Navigate to="Products" />
    }



  return <>
    <div className="container inner_Pages">

        <div className="row align-items-center">

            <div className="col-md-3">

                <figure>
                    <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                </figure>


            </div>
            <div className="col-md-7">

                <article>

                    <h1>
                        {data.data.data.title}
                    </h1>

                    <p>
                        {data.data.data.description}
                    </p>
                    <p>
                       price : <span className='text-main'>{data.data.data.price} EGP</span>
                    </p>


                    <button onClick={()=> AddProduct(data.data.data.id) } className=' btn bg-main text-white w-100'>
                        Add to cart +
                    </button>

                    
                </article>

            </div>
            <div className="col-md-2">
              <p className='me-2' > <span> <i style={{color:"#DAA520"}} className='fa-solid fa-star' ></i> </span> {data.data.data.ratingsAverage } </p>
            </div>


        </div>
    </div>
    
  
  </>
}


///    ()=>AddProduct(data.data.data.id) 
