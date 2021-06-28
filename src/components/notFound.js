import React from 'react'
import { Link } from 'react-router-dom'

export default function notFound() {
    return (
        <div className="text-center m-5">
            <h1>Page Not Found</h1>
            <Link to="/dashboard">Go To Dashboard</Link>
        </div>
    )
}
