import React from 'react';
import sun from './assets/icon-sun.svg';
import moon from './assets/icon-moon.svg';
import './header.css';

export default function main(){
    let [isDarkTheme,setIsDarkTheme]=React.useState(false);
    function changeTheme(){
        setIsDarkTheme(prevState=>!prevState);
    }
    return(
        <header>
            <h1>Todo</h1>
                <input checked={!isDarkTheme} type='radio' name='theme' className='theme-select' onChange={()=>changeTheme()} id='light' value='light' />
                <label htmlFor='light' className='theme-select-label' id='label-for-light' >
                    <img src={sun} alt='theme-icon' class-name='theme-icon' />
                </label>
                <input checked={isDarkTheme} type='radio' name='theme' className='theme-select' onChange={()=>changeTheme()} id='dark' value='dark' />
                <label  htmlFor='dark' className='theme-select-label' id='label-for-dark' >
                    <img src={moon} alt='theme-icon' class-name='theme-icon' />
                </label>
        </header>
    );
}