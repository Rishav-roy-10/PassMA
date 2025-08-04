import React, { useState, useEffect, useRef } from 'react';
import Table from './Table';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPassword = async () => {
        let req = await fetch('https://password-manager-2793.onrender.com/');
        let password = await req.json();
        console.log(password);
        setPasswordArray(password);
    };

    useEffect(() => {
        getPassword();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const ShowPassword = () => {
        passwordRef.current.type =
            passwordRef.current.type === 'password' ? 'text' : 'password';
    };

    const savePassword = async () => {
        if (form.site.length === 0 || form.username.length === 0) {
            alert('Write something');
            passwordRef.current.focus();
            return;
        }
        if (form.password.length < 6) {
            alert('Password must be at least 6 characters long');
            passwordRef.current.focus();
            return;
        }

        let id = form.id || uuidv4();

        if (form.id) {
            await fetch('https://password-manager-2793.onrender.com/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: form.id }),
            });
        }

        const newPassword = { ...form, id };

        await fetch('https://password-manager-2793.onrender.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPassword),
        });

        setPasswordArray([...passwordArray.filter(p => p.id !== form.id), newPassword]);

        setForm({ site: '', username: '', password: '', id: '' });

        console.log('Submitted Form:', form);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-6 sm:px-6 sm:py-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-500 mb-3 sm:mb-4">Password Manager</h1>
                <p className="text-lg sm:text-xl text-center text-gray-300 mb-5 sm:mb-6">Your own password manager</p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        savePassword();
                    }}
                    className="flex flex-col items-center space-y-5 sm:space-y-6"
                >
                    <div className="w-full">
                        <input
                            value={form.site}
                            onChange={handleChange}
                            name="site"
                            className="rounded-full px-4 py-2 w-full border border-gray-600 placeholder:text-white text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter website URL"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 w-full space-y-4 sm:space-y-0">
                        <div className="relative w-full sm:w-1/2">
                            <input
                                value={form.username}
                                onChange={handleChange}
                                name="username"
                                className="rounded-full px-3 py-2 w-full border border-gray-600 placeholder:text-white bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                type="text"
                                placeholder="Enter Username"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <lord-icon
                                    src="https://cdn.lordicon.com/kdduutaw.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#00ffff,secondary:#facc15"
                                    style={{ width: '24px', height: '24px' }}
                                />
                            </div>
                        </div>

                        <div className="relative w-full sm:w-1/2">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                className="rounded-full px-3 py-2 w-full border border-gray-600 placeholder:text-white bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                type="password"
                                ref={passwordRef}
                                placeholder="Enter Password"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={ShowPassword}
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#facc15,secondary:#00ffff"
                                    style={{ width: '24px', height: '24px' }}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="rounded-full mt-3 sm:mt-4 px-6 py-2 bg-blue-700 text-white font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 border border-black cursor-pointer"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="loop"
                            delay="1000"
                            stroke="bold"
                            colors="primary:#facc15,secondary:#00ffff"
                            style={{ width: '30px', height: '30px' }}
                        />
                        <span className="text-lg sm:text-xl font-bold">Submit</span>
                    </button>
                </form>
            </div>

            <Table passwordArray={passwordArray} setPasswordArray={setPasswordArray} setForm={setForm} editPassword={savePassword} />
        </div>
    );
};

export default Manager;
