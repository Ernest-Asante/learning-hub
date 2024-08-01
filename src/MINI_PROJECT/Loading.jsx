import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"10vh",marginTop:"20%"}}><CircularProgress/></div>
  )
}

export default Loading