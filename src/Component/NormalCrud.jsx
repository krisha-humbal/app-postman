import React from 'react'
import { useState } from 'react'

const NormalCrud = () => {
    const [data, setData] = useState([])
    const [value,setValue]=useState({
        name:'',
        email:'',
        address:'',
        image:''
    })
    const [editIndex,setEditIndex]=useState(null)
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(editIndex!==null)
        {
            const newdata=[...data]
            newdata[editIndex]=value
            setData(newdata)
            setEditIndex(null)
        }
        else{
          setData([...data,value])
          console.log(value);
          
        }
        setValue({
            name:'',
            email:'',
            address:'',
            image:''
        })
    }
   const handleDelete=()=>{
        const newdata=[...data]
        newdata.splice(editIndex,1)
        setData(newdata)
    }
   const handleEdit=(index)=>{
        setValue(data[index])
        setEditIndex(index)
    }
     const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setValue({ ...value, image: URL.createObjectURL(file) });
        }
      };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter name' value={value.name} onChange={(e)=>setValue({...value,name:e.target.value})}/>
        <br/>
        <input type="text" placeholder='Enter email' value={value.email} onChange={(e)=>setValue({...value,email:e.target.value})}/>
        <br/>
        <input type="text" placeholder='Enter address' value={value.address} onChange={(e)=>setValue({...value,address:e.target.value})}/>
        <br/>
        <input type="file" accept='image/*' placeholder='Enter address' onChange={handleFileChange}/>
        <br/>
        <button type='submit' >Submit</button>

      </form>
      <table border={1}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.image && <img src={item.image} width={'100px'}/>}</td>
                    <td><button onClick={()=>handleEdit(index)}>Edit</button></td>
                    <td><button onClick={()=>handleDelete(index)}>DELETE</button></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default NormalCrud
