import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'

const SingleFav = () => {
    const [data,setData] = useState({});
    const {id} = useParams();
    // console.log(id)
    console.log(data,"DATA");
    useEffect(()=>{
        axios.get(`https://sponge-juicy-tub.glitch.me/fav/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
    },[]);
  return (
    <div className=' min-h-screen px-8 py-8'>
        <h1 className='text-[2rem] font-Montserrat text-center'>WELCOME TO SINGLE FAV PAGE</h1>
        <p className='flex items-center text-[1.5rem] font-Montserrat font-medium'>{data.name}</p>
    </div>
  )
}

export default SingleFav