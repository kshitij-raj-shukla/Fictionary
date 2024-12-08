// import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loder/Loader';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const [Data, setData] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // console.log(isLoggedIn, role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-id/${id}`
      );
      setData(response.data.data)
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };
  const handelCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handelFavourties = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };


  const deleteBook = async () => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers });
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 itms-start'>
          <div className=' w-full lg:w-3/6  '>
            {" "}
            <div className=' flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12 '>
              {" "}
              <img
                src={Data?.url}
                alt="/"
                className='h-50vh md:h-[60vh] lg:h-[70vh] rounded object-contain'></img>


              {isLoggedIn == true && role === 'user' && (
                <div className='flex flex-col md:flex-row lg:flex-col mt-4 items-center justify-between lg:justify-start lg:mt-0'>
                  <button className='bg-red-500 rounded lg:rounded-full text-3xl p-3 text-white flex items-center justify-center' onClick={handelFavourties}>
                    <FaHeart /><span className='ms-4 block lg:hidden'>Favrouties</span>
                  </button >
                  <button className='bg-blue-500 mt-8 md:mt-0 rounded lg:rounded-full text-3xl p-3 lg:mt-8 text-white flex items-center justify-center' onClick={handelCart}>
                    <FaShoppingCart /><span className='ms-4 block lg:hidden'>Add tocart</span>
                  </button>
                </div>
              )}


              {isLoggedIn == true && role === "admin" && (
                <div className='flex flex-col md:flex-row lg:flex-col mt-4 items-center justify-between lg:justify-start lg:mt-0'>
                  <Link to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-3 text-black flex items-center justify-center' >
                    <FaRegEdit /><span className='ms-4 block lg:hidden'>Edit</span>
                  </Link >
                  <button className='bg-zinc-900 mt-8 md:mt-0 rounded lg:rounded-full text-3xl p-3 lg:mt-8 text-white flex items-center justify-center'
                    onClick={deleteBook}
                  >
                    <MdDeleteOutline /><span className='ms-4 block lg:hidden'>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>{Data?.title}</h1>
            <p className='text-zinc-400 mt-1'>by {Data?.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{Data?.desc}</p>
            <p className='text-zinc-400 mt-4 flex items-center justify-start'>Language: {Data?.language}</p>
            <p className='text-zinc-100 mt-4 text-3xl font-semibold'>Rs. {Data?.price}</p>
          </div>
        </div>
      )}
      {!Data && <div className='h-screen bg-zinc-900 flex item-center justify-center'><Loader /></div>}
    </>
  )
}

export default ViewBookDetails
