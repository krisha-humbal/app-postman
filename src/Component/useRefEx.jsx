import React, { useRef } from 'react'

const useRefEx = () => {
    const changeRef=useRef()
    const secRef=useRef()

    const handleChange=() =>{
        changeRef.current.focus()
        changeRef.current.style.color="green"
    }
    const handleSec=()=>{
        secRef.current.style.color="blue"
    }
  return (
    <div>
      <input type="text" ref={changeRef} name='' onChange={handleChange}/>
      <input type="text" ref={secRef} name='' onChange={handleSec}/>
        <button onClick={handleChange}>Click</button>
    </div>
  )
}

export default useRefEx
