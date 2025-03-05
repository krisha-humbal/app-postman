import axios from 'axios'
import { Formik,Field,Form } from 'formik'
import React, { useEffect, useState } from 'react'

const FormikAPiCrud = () => {
    const token="9ALNyLh1WYR6iUnq"
    const [ini,setIni]=useState({
        name:'',
        email:'',
    })
    const [editId,setEditId]=useState(null)
    useEffect(()=>{
        dataView()
    },[])
    const[list,setList]=useState([])
    const handleSubmit=(values,{resetForm})=>{
        if (editId) {
            axios.patch(`https://generateapi.onrender.com/api/testing/${editId}`,values,{
                headers:{
                    
                    Authorization:token
                }
            })
            .then(()=>{
                console.log("data Update success");
                dataView()
                setEditId(null)
                resetForm()

            })
            .catch((error)=>{
                console.log(error);
                
            })
        }
        else{

            axios.post("https://generateapi.onrender.com/api/testing",values,{
                headers:{
                    Authorization: token
                }
            }
        )
        .then(()=>{
            console.log("data enter success");
            resetForm()
            dataView()

        })
        .catch((error)=>{
            console.log(error);
            
        })
        
        }
        
    }
    const dataUpdate=(item)=>{
        setIni(
            {
                name:item.name,
                email:item.email
            }
        )
        setEditId(item._id)
    }
    const dataView=()=>{
        axios.get("https://generateapi.onrender.com/api/testing",
        {
            headers:{
                Authorization:token
            }
        })
        .then((res)=>{
            console.log(res.data.Data);
            setList(res.data?.Data || []);
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }
  
    const deleteItem=(id)=>{
        axios.delete(`https://generateapi.onrender.com/api/testing/${id}`,
            {
                headers:{
                    Authorization:token
                }
            }
        )
        .then(()=>{
            console.log("data delete success");
            dataView()
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div>
     <Formik
        initialValues={ini}
        enableReinitialize
        onSubmit={handleSubmit}
     >
        <Form>
            <Field name="name" ></Field>       
           <Field name="email"></Field>
           <button type='submit'>Submit</button>
        </Form>
     </Formik>
     
     
     <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><button onClick={() => deleteItem(item._id)}>Delete</button></td>
                                <td><button onClick={() => dataUpdate(item)}>Update</button></td>
                            </tr>
                        ))
                     }
                </tbody>
            </table>

    </div>
  )
}

export default FormikAPiCrud

