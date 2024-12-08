import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {
  const headers ={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const handelRemoveBook = async () => {
    const response =await axios.put(
      "http://localhost:1000/api/v1/remove-from-favourite",
      {},
      {headers}
    );
    alert(response.data.message); 
    
  }
  // console.log("d:", data);
  return (
    <div className=' ml-8 bg-zinc-800 rounded p-4 felx-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
          <div className='bg-zinc-900 rounded flex itmes-center justify-center'>
            <img src={data.url} alt="/" className='h-[25vh]'></img>
          </div>
          <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>Rs. {data.price}</p>
        </div>
      </Link>
      {favourite&&(
        <button className='bg-yellow-50 px-4 py-2 rounded border-yellow-500 text-yellow-500 mt-4' 
        onClick={handelRemoveBook}
        >
        Remove from favourite
      </button>
      )}
      </div>
       
    
  );
};

export default BookCard
