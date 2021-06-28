import React, { useRef, useState } from 'react'
import {useAuth} from "./contexts/AuthContext"
import {Link} from "react-router-dom"

const ForgotPassword = () => {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)
    const [message, setMessage] = useState("")

   async function handleSubmit(e) {
        e.preventDefault()
 
        try {
            setMessage("")
            setError("")
            setLoading(true)
           await resetPassword(emailRef.current.value)
           setMessage("Check your inbox for further instructions")
        } 
        catch(e){
             setError("Failed to reset password !!")
        }
        setLoading(false)    
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
    
                <div className="col-xl-10 col-lg-12 col-md-9">
    
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col">
                                    <h1 className ="text-center mt-4">Reset Password</h1>
                                    <div className="p-5">
                                        <div className="text-center">
                                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                            {message && <div className="alert alert-success" role="alert">{message}</div>}
                                        </div>
                                        <form className="user"  onSubmit = {handleSubmit}>
                                            <div className="form-group mb-2">
                                                <input type="email" className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    ref = {emailRef}    
                                                    />
                                            </div>
                                          
                                            
                                                <button disabled={loading} href="/dashboard" type="submit" className="btn btn-primary btn-block">
                                                    Reset Password
                                                </button> 
                                                                               
                                        </form>
                                        <hr/>   
                                        <div className="text-center">
                                            <Link className="small" to="/login">Login</Link>
                                        </div>
                                        <div className="text-center">
                                        <Link className="small" to="/register">Are you new? Register!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
        </div>
        )
}

export default ForgotPassword