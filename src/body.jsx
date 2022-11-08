import React from 'react';
import {nanoid} from 'nanoid';
import Element from './list-element';
import './body.css';

export default function main(){
    //Job list
    let [jobs,setJobs]=React.useState(JSON.parse(localStorage.getItem('todo-list')) || []);
    let [view,setView]=React.useState('all');
    //todo initialize note to local storage
    React.useEffect(()=>{
        localStorage.setItem('todo-list',JSON.stringify(jobs));
    },[jobs]);
    //loop over raw values to convert them into html elements

    let activeElements=[],completedElements=[];
    for(let i=0;i<jobs.length;i++){
        let job=<li key={jobs[i].id}><Element item={jobs[i]} deleteJob={deleteJob} markDone={markDone} /></li>;
        if(jobs[i].done===true){
            completedElements.push(job);
        }
        else{
            activeElements.push(job);
        }
    }
    let listElements=jobs.map(job=>{
        return <li key={job.id}><Element item={job} deleteJob={deleteJob} markDone={markDone} /></li>
    })

    //add items to list
    function addJob(event){
        if(event.target.value.length>0){
            let {value}=event.target;
            setJobs(prevState=>[{id:nanoid(),task:value,done:false},...prevState]);
            event.target.value='';
        }
    }
    //edit notes

    //remove items form list
    function deleteJob(id){
        setJobs(prevState=>{
            return prevState.filter((job)=>job.id!==id)
        });
    }
    //mark job as done
    function markDone(id){
        // setJobs(prevState=>prevState.map(job=>{
        //     return job.id===id?{...job,done:!job.done}:job
        // }));

        setJobs(prevState=>{
            let newList=[],revList=prevState.reverse();
            for(let i=revList.length-1;i>=0;i--){
                let job=revList[i];
                if(job.id===id){
                    job={...job,done:!job.done};
                }
                if(job.done===true){
                    newList.unshift(job);
                }
                else{
                    newList.push(job);
                }
            }
            return newList.reverse();
        })
    }
    //delete all jobs which are done
    function deleteDone(){
        setJobs(prevState=>prevState.filter((job)=>job.done===false));
    }
    //change view
    function changeView(event){
        let {value}=event.target;
        if(value!==view){
            setView(value);
        }
    }
    //return html elements as jsx
    return(
        <div className='container'>
            <input type='text' id='inputField' placeholder='Enter' onBlur={(e)=>addJob(e)} />
            <ul id='jobList'>
                {/* {view==='all' && listElements} */}
                {(view==='active' || view==='all') && activeElements}
                {(view==='completed' || view==='all') && completedElements}
                <div id='dashBoard'>
                    <span>{activeElements.length} items left</span>
                    <button type='button' className='action view-options' id='clear-complete' onClick={()=>deleteDone()} >Clear Completed</button>
                </div>
            </ul>
            <div id='actions'>
                <input checked={view==='all'} type='radio' name='view' id='all' className='action' value='all' onChange={(e)=>changeView(e)} />
                <label htmlFor='all' className='view-options' >All</label>                
                <input checked={view==='active'} type='radio' name='view' id='active' className='action' onChange={(e)=>changeView(e)} value='active' />
                <label htmlFor='active' className='view-options' >Active</label>                
                <input checked={view==='completed'} type='radio' name='view' id='completed' className='action' onChange={(e)=>changeView(e)} value='completed' />
                <label htmlFor='completed' className='view-options' >Completed</label> 
            </div>
        </div>
    );
}