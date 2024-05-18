import axios from "axios"
import { createContext , useState } from "react"
import toast from "react-hot-toast"
import { ThreeCircles } from "react-loader-spinner"
export const CartContext= createContext()

 

export function CartContextprovider({children}){

    const [NumOfCartItems, setNumOfCartItems] = useState(0)
    const [TotalCartPrice, setTotalCartPrice] = useState(0)
    const [AllProucts, setAllProucts] = useState([])
    const [CartId, setCartId] = useState(null)

    // const {mytoken} = useContext(authContext)

    async function AddProductToCard(productId){
        
        // const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
        //     "productId": productId
        // } , {   
        //     headers : {token:localStorage.getItem("tkn")} 
        //     }).then((res)=>{

        //         getUserCart()
        //     // setNumOfCartItems(res.data.numOfCartItems)
        //     // setTotalCartPrice(res.data.data.totalCartPrice)
        //     // setAllProucts(res.data.data.products)
        //     return res.data;
        // })
        // .catch((err)=>{

        //     console.log(err);
        //     return false;
        // })



        try{

            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{"productId": productId } , { headers :{token: localStorage.getItem("tkn") } });

            if(data.message =="Product added successfully to your cart"){
                
                getUserCart();
                return data;

            }

           
        }
        catch(e){
            console.log(e);
        }


       
    }

    async function ClearAllProduct(){

        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers:{token: localStorage.getItem("tkn")}
        })
        .then((res)=>{
            setAllProucts([])
            setNumOfCartItems(0)
            setTotalCartPrice(0)
            if(res){

              toast.success("Clear Cart successfully..." , {duration:1500 , position:"top-right" , style: {backgroundColor:"green", fontSize:"20px" , height:"80px", color:"white"}})

            }
            else{

              toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})

            }

            // if(!res.data){

            //     return  <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">

            //     <ThreeCircles
            //     visible={true}
            //     height="100"
            //     width="100"
            //     color="#fff"
            //     ariaLabel="three-circles-loading"
            //     wrapperStyle={{}}
            //     wrapperClass=""
            //     />
          
            //     </div>

            // }

            return true;
        })
        .catch((err)=>{
            console.log(err);
            return false;

        })

        return res;

    }

    async function getUserCart(){
        axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {headers: {token: localStorage.getItem("tkn")}})
        .then((res)=>{
            localStorage.setItem('userID' , res.data.data.cartOwner)
            setCartId(res.data.data._id)
            setAllProucts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)

        })
        .catch((error)=>{
            // toast.error("Error occurred " , {duration:1500 , position:"top-right" , style: {backgroundColor:"red" , color:"white", fontSize:"20px" , height:"80px"}})
        })
      
    }

    async function DeleteProduct(id){

        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers:{token: localStorage.getItem("tkn")}
        })
        .then((res)=>{
            setAllProucts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            return true;
        })
        .catch((err)=>{
            console.log(err);
            return false;

        })

        return res;

    }


    async function UpDateCount(id , UpCount){ 
        const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
        
        {
            "count": UpCount
        },
        {
            headers: {token : localStorage.getItem("tkn")}
        })
        .then((res)=>{

            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setAllProucts(res.data.data.products)
            return true;
        })
        .catch((err)=>{
            console.log(err);
            return false;

        })


        return booleanFlag;


    }


    
    // useEffect( ()=>{
    // getUserCart();
    // }, [mytoken] )



    return<CartContext.Provider value={{ CartId , ClearAllProduct, DeleteProduct , getUserCart, AddProductToCard ,NumOfCartItems, TotalCartPrice  ,AllProucts , UpDateCount }}>
    
    {children}
    
    
    </CartContext.Provider>

} 