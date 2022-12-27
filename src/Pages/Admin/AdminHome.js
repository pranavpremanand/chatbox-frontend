import React from 'react'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
function AdminHome() {
    const navigate = useNavigate()
  return (
    <>
    <div>AdminHome</div>
    <Button onClick={()=>{localStorage.removeItem('adminToken')
    navigate('/admin')
    }} variant='contained' color='secondary'>Logout</Button>
    </>
  )
}

export default AdminHome