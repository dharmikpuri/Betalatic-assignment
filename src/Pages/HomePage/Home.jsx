import { useEffect, useState } from 'react';
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [allpackage, setAllpackage] = useState("");
  const [search, setSearch] = useState("");
  // JSON.parse(localStorage.getItem("search")) ||
  const [searchItem, setSearchItem] = useState([]);
  // console.log(,"LS")

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    if(val.trim() == ""){
      setSearchItem([]);
      return false;
    }else{
      const filterItem = allpackage.filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
      // console.log(filterItem, "Filter Item");
      setSearchItem(filterItem);
      console.log(val,"aaaa");
    }
  }
  // const handleSearchBtn = () => {
  //   const filterItem = allpackage.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
  //   // console.log(filterItem, "Filter Item");
  //   // localStorage.setItem("search", JSON.stringify(filterItem));
  //   setSearchItem(filterItem);
  // }
  // useEffect(() => {
  const AddToFav = (el) => {
    const verification = data.some((item) => (
      item.id == el.id
    ))
    console.log(verification,"aaaa")
    { !verification ? axios.post("https://sponge-juicy-tub.glitch.me/fav", el).then(() => {
      setData((prevData) => [...prevData, el]);
      alert(`${el.name} Added to fav`)
    }).catch((err) => console.log(err.message)) : alert(`${el.name} Already Present in Fav`) }
  }
  // }, []);
  useEffect(() => {
    axios.get("https://sponge-juicy-tub.glitch.me/favnpm")
      .then((res) => setAllpackage(res.data))
      .catch((err) => console.log(err));

    axios.get("https://sponge-juicy-tub.glitch.me/fav")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))

  }, [])
  return (
    <section className='border min-h-screen px-8 py-8'>
      <div>
        <label className='text-[#4b5c6b] text-[1.5rem] font-Montserrat font-semibold'>Search for NPM Packages</label>
        <br />
        <input type="text" placeholder='Search Npm Packages' value={search}
          name='search' onChange={handleSearch} className="input input-bordered border-[2px] w-full  mt-1 placeholder:text-[1.3rem] placeholder:font-medium" />
        <br />

        <div className='flex justify-between items-center'>
        {/* <button className='border mt-4 px-8 py-2 rounded-lg bg-[#6558f5] text-white text-[1.1rem] font-Montserrat font-semibold active:scale-90 transition duration-150 ease-out ' onClick={handleSearchBtn}>Search</button> */}

        <button className='border mt-4 px-8 py-2 rounded-lg bg-[#6558f5] text-white text-[1.1rem] font-Montserrat font-semibold active:scale-90 transition duration-150 ease-out ' onClick={()=>navigate("/fav")}>Go To Fav</button>
        </div>

        <div className='mt-4'>
          {searchItem.map((el, i) => {
            return <p key={i} className='flex items-center text-[1.5rem] font-Montserrat font-medium'>
              {el.name}
              <label style={{ marginLeft: "20px" }} onClick={() => AddToFav(el)}>
                {<FaStar className='hover:text-[lightgreen] active:scale-90 transition duration-150 ease-out text-[#FFEB3B] cursor-pointer' />}
              </label>
            </p>
          })}
        </div>
      </div>
    </section>
  )
}

export default Home