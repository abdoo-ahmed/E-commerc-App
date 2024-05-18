import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"



const ValidateScima = yup.object({

  
  name:yup.string().required("name is required").min( 3 , "name min length is 3" ),
  email:yup.string().required("email is required").email(`The email must contain ("@", ".")`),
  password:yup.string().required("password is required").matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/ , ` must be  * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)`),
  rePassword:yup.string().required("re-Password is required").oneOf([yup.ref('rePassword'),null] , `re-Password pattern is inavalid`),
  phone:yup.string().required().matches(/^01[0125][0-9]{8}$/),

})
export default function Register() {

  // function onSubmit(e){
  //   e.preventDefault()
  //   console.log("hello");
  // }
  const inshialData ={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

  const [isClick, setisClick] = useState(false);
  const Navigate = useNavigate()
  const onsubmit= async (values)=>{
    ////   call Api
    setisClick(true)

    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values) 
    .then(function (x){
      console.log("sucsses" , x);
      console.log(values);
      Navigate("/login")
 
    })
    .catch(function (x){
      console.log("error" , x);
      console.log(values);
      Navigate("/login")
    })

    setisClick(false)

  }
  const myFormik = useFormik({ 

    initialValues:inshialData,
    onSubmit:onsubmit,
    // validate: function(values){
    //   const errors={}

    //   const nameReges= /^[A-Z][a-z]{3,20}$/
    //   const phoneReges= /^01[0125][0-9]{8}$/
    //   if (nameReges.test( values.name ) === false){
    //     errors.name = "error Name"
    //   }
    //   if (values.Email.includes("@") !== true ||  values.Email.includes(".") !== true ){
    //     errors.Email = "error Email"
    //   }

    //   if ( values.Password.length < 6 ||values.Password.length > 12 ){
    //     errors.Password = "error Password"
    //   }

    //   if ( values.repassword !== values.Password){
    //     errors.repassword = "error repassword"
    //   }

    //   if (phoneReges.test( values.Phone ) === false){
    //     errors.Phone = "error Phone"
    //   }


    //   return errors;
    // }


    validationSchema :ValidateScima


   })
   
  return <>
  <div className="container m-auto p-5">


    
    <h2 className='mb-3 mt-5 Log_Reg'>register now:</h2>
    
    <form onSubmit={myFormik.handleSubmit} >


      <label htmlFor="name" > Name :</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.name } type="text" id='name' className='form-control mb-2'/>
      {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger"> { myFormik.errors.name } </div> : ""}



      <label htmlFor="email" > Email :</label>
      <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={ myFormik.values.email } type="email" id='email' className='form-control mb-2'/>
      {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger"> { myFormik.errors.email } </div>: ""}



      <label htmlFor="password" >Password :</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.password } type="password" id='password' className='form-control mb-2'/>
      {myFormik.errors.password  && myFormik.touched.password ? <div className="alert alert-danger"> { myFormik.errors.password } </div> : ""}



      <label htmlFor="rePassword" > Re-password :</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.rePassword } type="password" id='rePassword' className='form-control mb-2'/>
      {myFormik.errors.rePassword  && myFormik.touched.rePassword ? <div className="alert alert-danger"> { myFormik.errors.rePassword } </div> : ""}



      <label htmlFor="phone" > Phone :</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.phone } type="text" id='phone' className='form-control mb-2'/>
      {myFormik.errors.phone  && myFormik.touched.phone ? <div className="alert alert-danger"> { myFormik.errors.phone } </div> : ""}



      <div className="d-flex">
        <button type='submit' className='rounded-3 btn before-btn ms-auto '> 
        
        {isClick?  <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['black', 'black', 'black', 'black', 'black']}/> : "Register Now" }
        
    
        
        </button>
      </div>


    </form>





  </div>
  
  
  
  </>
}
