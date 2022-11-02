import React,{useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if (!auth) {
            navigate('/login')
        }
    },[]);
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <section>
            <div className='register'>
                <div className="flex-col">
                    <h1>HOME</h1>
                    <button className='signout-btn' onClick={logout}>Sign Out</button>
                </div>
            </div>
        </section>
    )
}
