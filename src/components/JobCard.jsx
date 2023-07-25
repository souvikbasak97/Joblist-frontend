import React from 'react'
import { Default } from './Default'

const JobCard = ({jobs}) => {
    if(jobs?.length===0)
        return <Default/>
    const deletePost=(id)=>{
        console.log(id);
        fetch(`https://joblisting-api-service.onrender.com/post/${id}`,{
            method:'DELETE',
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(()=>console.log("Deleted"+id+"successfully"));
    }
  return (
    <div className='container m-auto grid p-2 align-middle sm:grid-cols-4 '>
        {
            jobs?.map((j)=>{
                
                return(
                    <>    
                        <div className="m-2 max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg justify-center">
                            <button className='float-right hover:shadow-2xl h-6 w-6 py-0 text-l text-white bg-red-700 rounded-full' onClick={()=>deletePost(j.id)}>X</button>
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{j.profile}</h5>
                            </a>
                            <p className="mb-3 font-normal  text-gray-400">{j.desc}</p>
                            <p className='mb-3 font-bold  text-gray-400'>YOE-{j.exp}</p>
                            <p className='mb-3 font-normal  text-gray-400'>Profile-{j.profile}</p>
                            <h6 className='mb-2 text-l font-bold tracking-tight text-gray-700'>Skills</h6>
                            {
                                j.techs.map((tech)=>{
                                    return(
                                        <>
                                            <div className="m-0.5 grid grid-flow-row auto-rows-max text-gray-400">
                                                <div>{tech}</div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Apply
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </>
                )
            })
        }
    </div>
  )
}

export default JobCard