import React, { useRef, useState } from 'react'
//import { useHistory } from 'react-router'
import {useAuth} from "../../contexts/AuthContext"
import alertify from "alertifyjs"

export default function SetUsername() {
  
    const setUsernameRef = useRef()
    const {setUsername, currentUser} = useAuth()
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)
    //const history = useHistory()

    function handleSubmit(e) {
        
    e.preventDefault()
    setLoading(true)
    setError("")
    setUsername(setUsernameRef.current.value)
    const promises = []
 
    Promise.all(promises).then(() =>{
        //history.push("/dashboard")
        alertify.success("Your Username is updated")
    }).catch(() => {
        setError("Failed to set Username")
    }).finally(() => {
        setLoading(false)
    })
    }
    return (
        <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-9">   
        <h3 className="mt-5 text-center">Change Username</h3>
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
                                            <input type="name" className="form-control form-control-user"
                                                id="username" aria-describedby="username"
                                                placeholder="Enter Username..."
                                                ref = {setUsernameRef} 
                                                defaultValue = {currentUser.displayName}
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
