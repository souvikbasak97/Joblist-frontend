import React, { useRef, useState } from 'react'

export const Modal = ({showModal,setShowModal}) => {
  const role=useRef(null),desc=useRef(null),yoe=useRef(null);

  const [skills,setSkills]=useState([]);
  const [counter,setCounter]=useState(0);

  const addInput=(s)=>{
    setCounter(counter+1);
    console.log(counter);
  }

  const handleInputChange=(e)=>{
    e.preventDefault();
    const abc={};
    abc[e.target.className]=e.target.value;
    setSkills({...skills,...abc});
  }

  const clear=()=>{
    setSkills([]);
    setCounter(0);
  }

  const postReq=()=>{
    const data={
      "id":"",
      "desc":desc.current.value,
      "exp":yoe.current.value,
      "profile":role.current.value,
      "techs":Object.values(skills)
    }
    fetch("https://joblisting-api-service.onrender.com/post",{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(response=>response.json())
    .then();
    setShowModal(false);
  }
  return (
    <>
      {showModal ? (
          <div className="backdrop:blur-md bg-white/20 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Post new Job</h3>
                  <button
                    className="bg-transparent text-red float-right hover:shadow-xl rounded-full"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Job Role
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black text-center" ref={role} />
                    <label className="block text-black text-sm font-bold mb-1">
                      Job Description
                    </label>
                    
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black" ref={desc}/>
                    
                    <label className="block text-black text-sm font-bold mb-1 py-2 px-1">
                      Years of Experience
                    </label>
                    <input className="pl-4 shadow appearance-none border rounded w-1/2 text-black text-center px-1" ref={yoe}/>
                      
                    
                    
                    <label className="pt-4 block text-black text-sm font-bold mb-1">
                      Skills
                    </label>
      
                    {Array.from(Array(counter)).map((c, index) => {
                      return (
                        <span className='p-2 block'>
                           <input                        
                            onChange={handleInputChange}
                            key={c}
                            className={index}
                            type="text"
                          />
                        </span>
                       
                      
                      );}
                    )}
                    
                    <button onClick={addInput}>
                      <p className='text-3xl p-3'>+</p>
                    </button>
                    <button onClick={clear}>
                      <p className='text-3xl p-3'>-</p>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={postReq}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
      ) : null}
    </>
  )
}
