import React, { createContext, useContext } from 'react'

const appContext=createContext()

const UseContextEx = () => {
    const data="Good Morning"
  return (
    <div>
      <appContext.Provider value={data}>
        <First></First>
        <Second></Second>
      </appContext.Provider>
    </div>
  )
}
const First= () => {
    const first=useContext(appContext)
    return
    (
        <>
            <span>{first}</span>
        </>
    )
}
const Second= () =>{
    const first=useContext(appContext)
    return
    (
        <>
            <span>{first}</span>
        </>
    )
}
export default UseContextEx
