import { useEffect, useState } from 'react'
import axios from "axios"
import { FaEye, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Fav = () => {
  const naviagte = useNavigate();
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false);
  const [editNpm, setEditNpm] = useState({ name: "", id: "" });
  const handleEdit = (e) => {
    const val = e.target.value;
    setEditNpm({ ...editNpm, name: val });
  }

  const EditNpm = (el) => {
    setEdit(true);
    setEditNpm({ name: el.name, id: el.id });
    
  }

  const EditSuccess=()=>{
    axios.patch(`https://sponge-juicy-tub.glitch.me/fav/${editNpm.id}`,editNpm)
    .then(() => {
      alert("Edited Successfuly");
      setEdit(false);
      getData();
    })
  }
  // console.log(editNpm, "editNpm");

  const getData = () => {
    axios.get("https://sponge-juicy-tub.glitch.me/fav")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }
  const handleDelete = (id) => {
    axios.delete(`https://sponge-juicy-tub.glitch.me/fav/${id}`)
      .then(() => {
        alert("Deleted Successfuly");
        getData();
      })
  }
  const handleView = (id) => {
    naviagte(`/fav/${id}`)
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <section className='border min-h-screen p-8'>
      <p className='text-[#4b5c6b] text-[1.5rem] font-Montserrat font-semibold flex items-center justify-between w-full'>Welcome to Favorite NPM Packages <button className='border-2 rounded-md px-4 py-1 bg-[#6558f5] text-white text-[1.2rem]'>Add fav</button></p>
      <div className='border-2 border-[#4b5c6b] mt-4 overflow-x-auto'>
        <table className="table border collapse">
          <thead>
            <tr className='border border-[#4b5c6b]'>
              <th className='text-black font-Montserrat font-bold text-[1.1rem]'>Pazckage Name</th>
              <th className='text-black font-Montserrat font-bold text-[1.1rem]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i} className='border border-[#4b5c6b]'>
                <td className='text-[1rem] font-Montserrat font-bold text-black'>{el.name}</td>
                <td className='flex gap-4 items-center'>
                  <button className='border border-black rounded-md font-medium  px-4 py-1 text-[1rem] hover:bg-[#41ce41] ' onClick={() => handleView(el.id)}><FaEye /></button>
                  <button onClick={() => handleDelete(el.id)} className='border border-black rounded-md font-medium  px-4 py-1 text-[1rem] hover:bg-red-400 ' ><RiDeleteBin6Fill /></button>
                  <button className='border border-black rounded-md font-medium  px-4 py-1 text-[1rem] hover:bg-[orange] ' onClick={() => EditNpm(el)}><FaEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
     { edit && <div>
      <input type="text" placeholder='Edit Npm Package' value={editNpm.name}
        name='search' className="input input-bordered border-[2px] w-full  mt-1 placeholder:text-[1.3rem] placeholder:font-medium mt-5" onChange={handleEdit} />

      <button className='border mt-4 px-8 py-2 rounded-lg bg-[#6558f5] text-white text-[1.1rem] font-Montserrat font-semibold active:scale-90 transition duration-150 ease-out ' onClick={EditSuccess}>Edit</button>
      </div> }
    </section >
  )
}

export default Fav