import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Sidebar = () => {

  const [opens,setOpens] = useState(false);

  return (
    <>
     <div className='absolute h-screen flex items-start justify-center px-4 pb-6'>
        <button hidden={opens?"hidden":""} onClick={()=>{setOpens(true)}} className='relative z-30 top-0 peer h-14 w-14 rounded-full transition focus-bg-slate-700 mb-[660px]'>
          <FaBars className="mx-4"/>
        </button>
        <div className={`z-20 fixed top-0 ${opens ? 'left-0' : '-left-96'} h-screen w-[175px] lg:w-[175px] bg-white shadow-2xl peer:transition ease out delay-150 duration-200`}>
           <nav role="navigation" className="p-6">
              <div className="flex item-center gap-4 pb-4">
                <h2 className="text-3xl text-slate-700 font-bold">Billing</h2>
                <button onClick={()=>{setOpens(false)}} className="relative left-7 top-1 bg-slate-300 rounded-full">
                <FaChevronLeft size={18}/>
                </button>
              </div>
              <div className="mt-4 -mx-4 relative overflow-y-auto overflow-x-hidden h-[85vh]">
                 <span className="uppercase px-4 text-gray-400">DR Ent</span>
                 <ul className="space-y-4 mb-12 px-4 mt-8">
                    <li className="flex flex-row">
                       <a href="/home" className="flex gap-4 text-black hover:text-blue-700 transition">
                        <FaHome size={25}/>
                        <a className="-ml-1">Home</a>
                       </a>
                    </li>
                    <li className="flex flex-row">
                       <a href="/me" className="flex gap-4 text-black hover:text-blue-700 transition">
                        <FaRegUser size={25}/>
                        <a className="-ml-1">Profile</a>
                       </a>
                    </li>
                 </ul>
              </div>
           </nav>
        </div>
     </div>
    </>
  )
}

export default Sidebar