import React, { useEffect, useState } from 'react'
import axios from "axios"
const Fav = () => {
  const [data, setData] = useState([])

  const getData = () => {
    axios.get("http://localhost:3001/fav")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/fav/${id}`)
    .then((res)=> {
      alert("Deleted Successfuly");
      getData();
    })
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div>
      {data.map((el, i) => (
        <div>
          <p>{el.name}</p>
          <button>view</button>
          <button onClick={()=> handleDelete(el.id)}>Delete</button>
          <button>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default Fav