import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminPublicRoute(props) {
    if(localStorage.getItem('adminToken')){
        return <Navigate to='/admin/users'/>
    }else{
        return props.children
    }
}

export default AdminPublicRoute