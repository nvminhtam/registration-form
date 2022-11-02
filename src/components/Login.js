import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Login() {
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    },[]);
    const [loginError, setLoginError] = useState();
    const onSubmit = data => {
        let config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
      
          axios
            .post("https://registration-api-ql4f.onrender.com/login", data, config)
            .then((res) => {
              console.log(res);
              localStorage.setItem("user",JSON.stringify(res.data));
              setLoginError("");
              navigate('/');
            })
            .catch((err) => {
              console.log("err",err);
              setLoginError(err.response.data);
              
            });
    }
    return (
        <section>
            <div className='input-form'>
                <div className="flex-col">
                    <h1>Sign In</h1>
                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder='Username'
                            {...register("username", { required: true })} />
                        {errors.username && <span className='error'>This field is required</span>}
                        <input type="password" placeholder='Password'
                            {...register("password", { required: true })} />
                        {errors.password && <span className='error'>This field is required</span>}
                        <button className='btn'>Sign In</button>
                        <span>
                            Not have an account?  
                        <Link to="/register" className='link'> Sign up</Link>
                        </span> 
                        <span className="error">{loginError}</span>
                    </form>
                </div>
            </div>
        </section>
    )
}
