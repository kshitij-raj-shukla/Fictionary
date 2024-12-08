import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../../store/auth"
const SideBar = ({ data }) => {
    const dispatch = useDispatch();
    const history=useNavigate();
    const role= useSelector((state)=>state.auth.role);
    return (
        <div className='bg-zinc-800 p-4 rounded flex felx-col justify-between h-[100%] '>

            <div className="grow flex flex-col items-center justify-center ">
                {" "}
                <img src={data.avatar} className='h-[12vh] rounded-full' />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                    {data.username}
                </p>
                <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
                <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block '></div>
            {role==="user"&&(<div className="w-full grow flex-col items-center justify-end hidden lg:flex">
                <Link
                    to="/profile"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Favourites
                </Link>
                <Link
                    to="/profile/orderHistory"
                    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Order History
                </Link>
                <Link
                    to="/profile/settings"
                    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Settings
                </Link>
            </div>)}

            {role==="admin"&&(
                <div className="w-full grow flex-col items-center justify-end hidden lg:flex">
                <Link
                    to="/profile"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    All Order
                </Link>
                <Link
                    to="/profile/add-book"
                    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Add Book
                </Link>
                
            </div>
            )}
            <button className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300' 
            onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changeRole("user"));
                localStorage.clear("id");
                localStorage.clear("token");
                localStorage.clear("role");
                history("/");
                }}>
                 Logout 
            </button>
            </div>


        </div>
    );
};

export default SideBar
