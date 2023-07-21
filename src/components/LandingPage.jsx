import React, { useRef, useState } from 'react'
import JobCard from './JobCard';
import Icm from '../icon.jpg'
import { Header, Modal } from './Modal';
import { AddJob } from './AddJob';

const LandingPage = () => {

  const [jobs,setJobs]=useState();
  const [showModal,setModal]=useState(false);
  const getJobs=async()=>{
    await fetch("http://localhost:8080/posts").then(response=>{
      return response.json();
    }).then(Jobs=>{
      setJobs(Jobs);
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
        await fetch(`http://localhost:8080/posts/${term}`).then(response=>{ 
          return response.json();
        }).then(Jobs=>{
          setJobs(Jobs);
        });
        //console.log(jobs);
      }
      getSearch();
    }
  }
  return (
    <div className='mt-3 w-full'>
      <div className='flex w-full mt-5 hover:shadow-lg rounded-full focus-within:shadow-lg border border-gray-200 px-5 py-3 items-center justify-around'>
        <img src={Icm} height={100} width={300} alt='Job Portal Logo' className='rounded-full' onClick={()=>getJobs()}/>
        <input ref={searchInput} type="search" placeholder='Enter job description...' className='w-1/3 p-4 pl-10 text-md text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' required/>
        <button type="button" className="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={search}>Search</button>
        <button type="button" className="relative rounded-sm bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setModal(true)}>+ Create new Job</button>
      </div>
      <div>
        <Modal showModal={showModal} setShowModal={setModal}/>
        <JobCard jobs={jobs}/>
      </div>
      
    </div>
      
    
  )
}

export default LandingPage