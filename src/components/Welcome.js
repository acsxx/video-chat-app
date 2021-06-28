import React, { Component } from 'react'

export default class Welcome extends Component {
    render() {
        return (
            <>
            <div className="container">
                <p className="display-1 text-center m-5 text-success">VIDEO-MEET APPLICATION</p>
            </div>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body text-center">
                        <h1 className="text-center">Welcome</h1>
                        <p>Create an account or login</p>
                        <a href="/register" className="btn btn-primary btn-block mb-2">Create Account</a>
                        <a href="/login" className="btn btn-secondary btn-block">Login</a></div>
                </div>
            </div>
            <div>
                <p className="text-center mt-5 text-primary">Made by Ali Çelik</p>
            </div>
            </>
        )
    }
}
