import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedIn"));
        console.log(user)
        if (user && user?.email.length > 0) {
            navigate("../home", {replace:true})
        }
    }, [navigate])

    const handleChange = (event) => {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const user = await response.json();
        if (response.ok) {
            localStorage.setItem("loggedIn", JSON.stringify(user))
            navigate("/home")
        }
        return user;

    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='bg-zinc-100 p-4 rounded min-w-[400px] shadow-sm flex items-center justify-center flex-col'>
                <h1 className='font-black text-2xl mb-2'>
                    LOGIN
                </h1>
                <div>
                    <img src='https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png' />
                </div>
                <div className='mt-4 mb-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-center items-center'>
                            <input type='text' className='p-2 rounded-lg mb-2' name='email' onChange={handleChange} value={formData.email} placeholder='email' />
                            <input type='password' className='p-2 rounded-lg mb-2' name='password' onChange={handleChange} value={formData.password} placeholder='password' />
                            <button type='submit' className='p-2 rounded-lg bg-green-400 hover:bg-green-700'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login