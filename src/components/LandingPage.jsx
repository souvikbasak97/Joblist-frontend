import React, { useRef, useState } from 'react'
import JobCard from './JobCard';
import Icm from '../icon.jpg'
import { Modal } from './Modal';
import { Loading } from './Loading';

const LandingPage = () => {

  const [jobs,setJobs]=useState();
  const [showModal,setModal]=useState(false);
  const [loading,setLoading]=useState(false);
  const getJobs=async()=>{
    setLoading(true);
    await fetch("https://joblisting-api-service.onrender.com/posts").then(response=>{
      return response.json();
    }).then(Jobs=>{
      setJobs(Jobs);
      setLoading(false);
    });
    console.log(jobs);

  }

  const searchInput=useRef(null);
  const search=(e)=>{
    e.preventDefault();
    const term=searchInput.current.value;
    setJobs();
    if(term.length>0){
        const getSearch=async()=>{
          setLoading(true);
        await fetch(`https://joblisting-api-service.onrender.com/posts/${term}`).then(response=>{ 
          return response.json();
        }).then(Jobs=>{
          setLoading(false);
          setJobs(Jobs);
        });
        //console.log(jobs);
      }
      getSearch();
    }
  }
  return (
    <div className='mt-3 w-full'>
      <div className='sm:flex w-full mt-5 hover:shadow-lg sm:rounded-full focus-within:shadow-lg border border-gray-200 px-5 py-3 items-center justify-around'>
        <img src={Icm} height={100} width={300} alt='Job Portal Logo' className='block m-auto rounded-full' onClick={()=>getJobs()}/>
        <input ref={searchInput} type="search" placeholder='Enter job description...' className='w-full sm:w-1/3 p-4 pl-10 text-md text-black block m-auto border rounded-lg bg-gray-50  border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' required/>
        <button type="button" className="block m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={search}>Search</button>
        <button type="button" className="block m-auto relative bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setModal(true)}>+ Create new Job</button>
      </div>
      <div className='m-auto'>
        <Modal showModal={showModal} setShowModal={setModal}/>
        {
          loading?<Loading text={"Loading..."}/>:<JobCard jobs={jobs}/>}
      </div>
      
    </div>
      
    
  )
}

export default LandingPage