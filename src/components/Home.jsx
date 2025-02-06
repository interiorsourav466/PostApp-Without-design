import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';



const Home = () => {
    const [title,setTitle]=useState("");
    const [value,setValue]=useState("");
    const [searchparams,setSearchParams]=useSearchParams();
    const pasteId=searchparams.get("pasteId"); 
    const dispatch =useDispatch();
    const allPastes=useSelector((state) =>state.paste.pastes);

    useEffect(()=>{
        console.log('inside use effect');
        if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
        
    },[pasteId])

    function createPaste(){
        const paste={
            title:title,
            content:value,
            _id:pasteId ||
            Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }
        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }
  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
        <input 
        className='p-1 rounded-2xl mt-2 w-[66%] h-10 pl-4 focus:outline-none focus:ring-0 focus:border-0'
        type="text" 
        placeholder='enter title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <button className='p-2 rounded-2xl mt-2 min-w-[150px] focus:outline-none focus:ring-0 focus:border-0' onClick={createPaste}>

            {
                pasteId ? "Update My Paste":"Create My Paste"
            }
        </button>
    </div>
    <div className='mt-8'>
            <textarea 
            className='rounded-2xl mt-4, min-w-[500px] p-4'
            value={value}
            placeholder='enter content here'
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
            >
                
            </textarea>
    </div>
    </div>
  );
};

export default Home