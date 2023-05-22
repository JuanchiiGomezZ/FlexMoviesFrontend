import React from 'react'
import { useParams } from 'react-router-dom'
import Movies from './Movies'
import Series from './Series'


const ShowsSelector = () => {
    const {showType} = useParams()
  return (
   <>
    {
        showType == "Movies"
        ? <Movies/>
        : <Series/>
    }
   </>
  )
}

export default ShowsSelector