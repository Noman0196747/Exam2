import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaRegEye , FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const LoinWithgogle = () => {
  const auth = getAuth();
  const naviget = useNavigate()
  const provider = new GoogleAuthProvider()
const [Eye, setEye] = useState(false)
const [Loding, setLoing] = useState(false)
const [Inputvalue, setInputvalue] = useState({
  email:"",
  password:"",
})
const [Error, setError] = useState({
  EmailError:"",
  PasswordError:""
})

// handleEye funtitonality

const handleEye =() => {
  setEye(!Eye)
}

// handleLogintoContinue funtitonility
const handleLogintoContinue =(event) => {
  event.preventDefault()
}

// setInputvalue funtotonility
  
const setInputfild = (e) => {
  setInputvalue({
    ...Inputvalue,
    [e.target.id]: e.target.value,
  })
  console.log(e.target.id);
}

// handleLoginwithgoogle funtitonality
const handleLoginwithgoogle =() => {
  signInWithPopup(auth, provider)
  .then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
   if(user){
    naviget("/Home")
   }
    console.log(user);
    
   
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
   
  });
}

// check email & password regex
const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-5.-]+\.[a-zA-Z]{3,3}$/
const passwordRegex = /^(?=.*[0-8])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,9}$/


// handleSubmit function implement
const handleSubmit = () =>{
  if (!Inputvalue.email) {
    setError({
      ...Error,
      EmailError:"Email is missing",
    });
  }else if(!Emailregex.test(Inputvalue.email)){
    setError({
      ...Error,
      EmailError:"Email is missing or wrong",
    });
  }else if(!Inputvalue.password){
    setError({
      ...password,
      PasswordError:"password is missing"
    })
  }else if(!passwordRegex.test(Inputvalue.password)){
    setError({
      ...password,
      PasswordError:"password is missing"
    })
  }else{
    setInputvalue({
      
      email:"",
      password:"",
    });
    console.log("every thing is ok");
    
    setError({
       EmailError:"",
       PasswordError:""
       
  
    })
    setLoing(true)
    signInWithEmailAndPassword(auth, Inputvalue.email, Inputvalue.password)
    .then((userinfo) => {
      localStorage.setItem("userToken", userinfo.
        _tokenResponse.idToken )
      console.log(userinfo.
        _tokenResponse.idToken);
      
    }) 
    .finally(() => {
      setLoing(false)
    })
    }

 
  
}


  return (
    <>
           <div className='flex justify-center items-center  w-[50%] h-[100vh]'>
           <div className=''>
              <h1 className='text-[34px] font-Bold font-OpenSans mb-5  '>Login to your account!</h1>
              <div className='flex border-2  items-center py-5 px-3 rounded-lg pl-5 cursor-pointer' onClick={handleLoginwithgoogle}>
              <FcGoogle />
                <p className='pl-2 font-semibold text-[#03014C] text-[14px]'>Login with Google</p>
              </div>
              <form onSubmit={handleLogintoContinue}>


<div className=''>
<div className='  w-[77%] py-5 border-b-2 rounded-lg my-6'>
<label htmlFor='email' className="font-semibold">Email Address</label>
<input type='email' className='w-[77%] font-semibold text-[#03014C] text-[20px] opacity-[100%]' placeholder='Youraddres@email.com' id='email' name='email' value={Inputvalue.email} autoComplete='off' 
onChange={setInputfild} />
</div>
{Error.EmailError &&(
             <span className='text-red-600 font-nunito text-sm pl-2'>{Error.EmailError}</span>
)}



<div className=' opacity-50 w-[77%] py-5 border-b-2 rounded-lg my-6 relative'>
<label htmlFor='email' className="font-semibold">Password</label>
<input type= {Eye ? "Password" : "text"} className='w-[77%] font-semibold text-[#03014C] text-[20px]   opacity-[100%]' placeholder='password' id='password' name='password' value={Inputvalue.password}  autoComplete=''
onChange={setInputfild} />
 
<div className='absolute top-[50%] right-5 translate-y-[50%]' onClick={handleEye}>
         {Eye ? <FaRegEye /> : <FaEyeSlash /> } 
         </div>    
</div>
{Error.PasswordError &&(
             <span className='text-red-600 font-nunito text-sm pl-2'>{Error.PasswordError}</span>
          )}





<div className='text-center  my-12 relative '>
<button type='submit' className='w-full bg-blue-400 rounded-lg py-4 font-nunito text-white font-semibold text-[20px]' onClick={handleSubmit}>


{Loding && (<div className='h-5 w-5 bg-amber-400 animate-spin rounded-full border-r-8 border-l-neutral-50 absolute left-16 top-5 '>
            </div>)}
   Login to Continue</button>
</div>
</div>
<div className=' w-[77%]'>
<span className="font-nunito">Don’t have an account ? </span>
<span className="font-nunito text-[#EA6C00] font-bold">
  <Link to={"/"} >Sign UP</Link>
   
   </span>
</div>


</form>
            </div>
           </div>
    </>
  )
}

export default LoinWithgogle











