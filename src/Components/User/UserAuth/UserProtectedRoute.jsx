import React from 'react'
import { Navigate } from 'react-router-dom'

function UserAuth(props) {
    if(localStorage.getItem('userToken')){
        return props.children
    }else{
        return <Navigate to='/login'/>
    }
}

export default UserAuth