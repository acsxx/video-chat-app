import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import {useAuth} from "../../contexts/AuthContext"
import alertify from "alertifyjs"

export default function ChangeEmail() {
    const emailRef = useRef()
    const {currentUser, updateEmail} = useAuth()
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const promises = []
    if (emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }

    Promise.all(promises).then(() =>{
        history.push("/dashboard")
        alertify.success("Your email is updated")
    }).catch(() => {
        setError("Failed to update email")
    }).finally(() => {
        setLoading(false)
    })
    }
    return (
        <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-9">   
        <h3 className="mt-5 text-center">Change Email</h3>
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col">
                            <div className="p-5">
                                <div className="text-center">
                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                </div>
                                <form className="user"  onSubmit = {handleSubmit}>
                                        <div className="form-group mb-2">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                ref = {emailRef}
                                                defaultValue = {currentUser.email}    
                                                />
                                        </div>
                                       
                                        <button disabled={loading} href="/room" type="submit" className="btn btn-outline-success btn-block">
                                                Update
                                        </button> 
                                                                           
                                    </form>
                                <hr/>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}
