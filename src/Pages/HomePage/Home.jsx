import { useEffect, useState } from 'react';
import axios from "axios";
import { FaStar } from "react-icons/fa6";
const Home = () => {
  const [data, setData] = useState([])
  const [allpackage, setAllpackage] = useState("");
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(JSON.parse(localStorage.getItem("search")) || []);
  // console.log(,"LS")
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    // console.log(val);
  }
  const handleSearchBtn = () => {
    const filterItem = allpackage.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
    // console.log(filterItem, "Filter Item");
    localStorage.setItem("search", JSON.stringify(filterItem));
    setSearchItem(filterItem);

  }
  // useEffect(() => {
  const AddToFav = (el) => {
    const verification = data.some((item) => (
      item.id == el.id
    ))
    { !verification ? axios.post("http://localhost:3001/fav", el).then(() => alert("Aded to fav")).catch((err) => console.log(err.message)) : alert("Already hai bhai") }
  }
  // }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/favnpm")
      .then((res) => setAllpackage(res.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:3001/fav")
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
        <button className='border mt-4 px-8 py-2 rounded-lg bg-[#6558f5] text-white text-[1.1rem] font-Montserrat font-semibold active:scale-90 transition duration-150 ease-out ' onClick={handleSearchBtn}>Search</button>
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