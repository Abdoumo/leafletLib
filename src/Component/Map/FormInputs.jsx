import React , { useState } from 'react'

const FormInputs = ({coors , setCoors}) => {
    let [ position , setPosition ] = useState({
        lat : "",
        lang : ""
    })

    const handleOnClick = (e) => {
        setPosition({...position , [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCoors({
            ...coors , 
            lat : position?.lat ,
            lang : position?.lang
        })
    }

    
    return (
    <div>
    <div>
    <label >latitude : </label>
    <input type="text"  name="lat" onChange={e => handleOnClick(e)} />
    </div>
    <div>
    <label >Langtitude : </label>
    <input type="text"  name="lang" onChange={e => handleOnClick(e)} />
    </div>

    <button onClick={e => handleSubmit(e)} >Ok</button>
    </div>
  )
}

export default FormInputs