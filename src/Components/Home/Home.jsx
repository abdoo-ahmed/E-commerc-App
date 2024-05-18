import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import SimpleSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { CartContext } from '../AuthContext/CartContext'
import toast from 'react-hot-toast'


export default function Home() {

  const {AddProductToCard} =   useContext(CartContext);
  
  async function AddProduct(id){
    const res = await AddProductToCard(id)
    if(res){

      toast.success("It has been successfully added. 🛺" , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})

    }
    else{
        
      toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})
   
    }

  }


  const [allProducts, setAllProducts] = useState(null)
  function getAllProduct(){


    axios.get("https://ecommerce.routemisr.com/api/v1/products")

   .then( (res) => {
    setAllProducts(res.data.data)
   } )
   .catch( (err) => {
      console.log(err);
   } )
   
  }

  useEffect( ()=>{
    getAllProduct()
  } , [] )




  return <>



  { allProducts ?   <div className="container inner_Pages">

    <div className="row  d-flex justify-content-center slider_center">

      <div className="col-md-4 p-3">
        <SimpleSlider/>
      </div>

      <div className="col-md-4 p-3">
        <img style={{height: "250px"}} className='w-100' src={require("../../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg")} alt="Bags" />

        <img style={{height: "250px"}} className='w-100' src={require("../../images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg")} alt="Gitar" />

      </div>

    </div>
    


    <CategorySlider/>


    <div className="products row my-5 g-4">

      {allProducts.map((product , index)=> <div key={index} className="col-md-3 overflow-hidden">


        <Link className="product" to={`/ProductDetails/${product.id}`}>
        
          <div>

            {/* {   imageCover    } */}
            <img className='mt-3 rounded-2 w-100' src={product.imageCover} alt="" />

            <h3 className='ms-2 h6 text-main'> { product.category.name} </h3>
            <h2 className='ms-2 h5'> {product.title.split(" ").slice( 0,2 ).join( " " ) } </h2>

            <div className="ms-2 d-flex justify-content-between">
              <p> {product.price} EGp </p>
              <p className='me-2' > <span> <i style={{color:"yellow"}} className='fa-solid fa-star' ></i> </span> {product.ratingsAverage } </p>
            </div>

          </div>
        
        </Link> 

        <button onClick={()=>{AddProduct(product.id)}} className='AddBtn btn w-100 bg-main text-white m-auto d-block '>
          + Add
        </button>



      </div> )}


    </div>
    
  </div> : <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">

    <ThreeCircles
    visible={true}
    height="100"
    width="100"
    color="#fff"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />


  </div> }


  

  
  
  
  </>
}
///  AddProduct(product.id)