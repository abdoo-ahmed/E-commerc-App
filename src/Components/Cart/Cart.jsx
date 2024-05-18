import React, { useContext, useEffect } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { CartContext } from '../AuthContext/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';



export default function Cart() {

  const {ClearAllProduct,  UpDateCount, DeleteProduct ,  getUserCart , NumOfCartItems , AllProucts ,TotalCartPrice}= useContext(CartContext)
  
  getUserCart();
  

  async function myDeleteProduct(id){
    const res = await DeleteProduct(id);
    if(res){
      toast.success("Deleted successfully..." , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})

    }
    else{
      toast.error("Error Deleted " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})
    }


  }

  async function updateMyProductCount(id , UpCount){

    const res = await UpDateCount(id , UpCount)
    if(res){
      toast.success("product Updated successfully..." , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})

    }
    else{
      toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})

    }
  }

  // const {mytoken} = useContext(authContext)
  // const [NumOfCartItems, setNumOfCartItems] = useState(0)
  // const [TotalCartPrice, setTotalCartPrice] = useState(0)
  // const [AllProucts, setAllProucts] = useState(null)
  // function GetUserCart(){
  //   axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {headers: {token: localStorage.getItem("tkn")}})
  //   .then((res)=>{
  //     setAllProucts(res.data.data.products)
  //     setNumOfCartItems(res.data.numOfCartItems)
  //     setTotalCartPrice(res.data.data.totalCartPrice)
  //   })
  //   .catch((error)=>{
  //       console.log(error);
  //   })
  // }
  

  // if(AllProucts.length){

  // }



  if(AllProucts.length){

    return <>
          
    {AllProucts ? <div className="container cart p-5">

      
      
      <div className="row">
        <div className="col-md-9">
          <h2 className='mb-5'>Cart Shop</h2>
          <h5 className='mb-4'>total price: <span  className='text-main'>{TotalCartPrice} EGP </span></h5>
    
        </div>
        <div className="col-md-3 ">
          <h4>
          total number of items: <span  className='text-main'>{NumOfCartItems}</span>
          </h4>
          <br />
          <Link to="/check-out">
            <div className="d-flex">
              
              <button style={{height:"50px",fontSize:"20px"}} className='w-50  m-auto btn btn-primary'> Check Out </button>
              
            </div>
          </Link>
        </div>
      </div>

          
        
        {AllProucts.map((product , index)=> <div key={index} className="row py-3 align-items-center ">
          <div className="col-md-2">
            <figure>
              <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
            </figure>
          </div>


          <div className="col-md-8">
            <article>
              
              <h5  className=''>{product.product.title}</h5>
              
              <h6>
                price: {product.price} EGP
              </h6>

              <div className='text-danger'>

                <button onClick={ ()=> myDeleteProduct(product.product.id) } className='btn btn-outline-danger '>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                
                </svg> <span className='mt-5'>Remove</span>
                </button>

              </div>
            </article>
          </div>


          <div className="col-md-2">

            <div className="d-flex justify-content-between align-items-center">
              <button onClick={()=>{ updateMyProductCount( product.product.id , product.count + 1  ) }} className='btn btn-outline-success'>+</button>
              <p>
                {product.count}
              </p>
              <button disabled={product.count ==1 } onClick={()=>{ updateMyProductCount(  product.product.id , product.count - 1   ) }} className='btn btn-outline-success'>-</button>
              
            </div>


          </div>
          <hr className='text-main' />
        </div>  )}
        <div className="d-flex">
        <button onClick={ClearAllProduct} className='btn m-auto btn-outline-danger'> Clear Your Cart </button>
        </div>
        </div> :  <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">

      <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#fff"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />

      </div>}

    </>


  }
  else{
    return <>

      <div className='inner_Pages container empty_cart'>
        <h2 className='p-5'>
         Cart Shop
        </h2>
        <br />
        <h2 className='p-5'>
          your cart is empty
        </h2>
      </div>
    
    </>
  }



}
