import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loder/Loader';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers })
      setAllOrders(response.data.data);
    };
    fetch();
  }, [])
  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'>
          {" "}<Loader />{" "}
        </div>
      )}

      {AllOrders && AllOrders.length > 0 &&
        (
          <div className="h-[100%] p-0 md:p-4text-zinc-100 ml-8">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All orders
            </h1>
            <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 mb-4">
              <div className="w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              <div className="w-[22%] ">
                <h1 className="">Books</h1>
              </div>
              <div className="w-[45%]">
                <h1 className="">Description</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">Price</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="">Status</h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className=''>Mode</h1>
              </div>
            </div >
            {AllOrders.map((items,i)=>
            <div>hello</div>)}
          </div>
      )}
    </>
  )
}

export default AllOrders
