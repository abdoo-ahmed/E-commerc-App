import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/Not Found/NotFound';
import Home from './Components/Home/Home';
import { AuthContextProvider } from './Components/AuthContext/AuthContext';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Brands from './Components/Brands/Brands';
import Catrgories from './Components/Catrgories/Catrgories';
import Products from './Components/Products/Products';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/Home/ProductDetails/ProductDetails';
import { CartContextprovider } from './Components/AuthContext/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';


const x= createBrowserRouter([
  { path:"/" , element: <Layout/>, children: [
    {  path:"" , element: <Login/> },
    {  path:"login" , element:<Login/> },
    {  path:"register", element: <Register/> },
    {  path:"home" , element: <Home/>  },
    {  path:"cart" , element: <Cart/>  },
    {  path:"*" , element: <NotFound/> },
    {  path:"Wishlist" , element:<Wishlist/> },
    {  path:"check-out" , element:<CheckOut/> },
    {  path:"AllOrders" , element:<AllOrders/> },
    {  path:"Products" , element:<Products/> },
    {  path:"ProductDetails/:id" , element:<ProductDetails/> },
    {  path:"Catrgories" , element:<Catrgories/> },
    {  path:"Brands" , element:<Brands/> },
    

  ] },

])

export default function App() {

  const myClient = new QueryClient()

  return <>
    
    
    
    
    
    <QueryClientProvider client={myClient}>

      <AuthContextProvider>

        <CartContextprovider>

          <RouterProvider router={x}/>

        </CartContextprovider>

      </AuthContextProvider>

    </QueryClientProvider>

    <Toaster></Toaster>


    </>
  
}
