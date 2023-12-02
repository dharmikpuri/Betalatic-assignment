import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaStar } from "react-icons/fa6";
const Home = () => {
  const [allpackage, setAllpackage] = useState("");
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(localStorage.getItem("search") || []);
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    // console.log(val);
  }
  const handleSearchBtn = () => {
    const filterItem = allpackage.filter((el, i) => el.name.toLowerCase().includes(search.toLowerCase()));
    // console.log(filterItem, "Filter Item");
    localStorage.setItem("search", JSON.stringifyfilterItem);
    setSearchItem(filterItem);

  }

  useEffect(() => {
    axios.get("http://localhost:3001/favnpm")
      .then((res) => setAllpackage(res.data))
      .catch((err) => console.log(err));
  }, [])
  return (
    <div>
      <label>Search for NPM Packages</label> <br />
      <input type='text' placeholder='Search Npm Packages' value={search}
        name='search' onChange={handleSearch} /> <br />
      <button onClick={handleSearchBtn}>Search</button>
      <div>
        {searchItem.map((el, i) => {
        return  <p>{el.name}<label style={{marginLeft:"20px"}}>{<FaStar style={{color:"#FFEB3B"}}/>}</label></p>

        })}
      </div>
    </div>
  )
}

export default Home