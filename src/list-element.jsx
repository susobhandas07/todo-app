import React from 'react';
import Cross from './assets/icon-cross.svg'
export default function main(props){
    return(
        <div className='listElement'>
            <input checked={props.item.done===true} onChange={()=>props.markDone(props.item.id)} type='checkbox' className='task' id={props.item.id} />
            <label htmlFor={props.item.id} className='taskLabel'>{props.item.task}</label>
            <button type='button' className='delete' onClick={()=>props.deleteJob(props.item.id)}>
                <img src={Cross} alt='delete' />
            </button>
        </div>
    );
}