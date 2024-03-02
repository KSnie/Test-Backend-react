import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import validation from "./SignupValidation";
import axios from 'axios';

function Signup() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(values);

        if (Object.values(validationErrors).every((error) => error === "")) {
            
            axios.post('http://localhost:3000/signup', values).then(res => {
            console.log(res.data)    
            
            if (res.data === "already") {
                    setError({ username: '', password: '', complete: 'Username is already used.' });
            } else {
                console.log(res.data)
                setError({ username: '', password: '', complete: 'Complete Register.' });
            }

            }).catch(err => console.log(err));

        } else {
        setError(validationErrors);
        }
    };
    return (
        <div>
            <h3>Sign-up</h3>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                {error.username && <p>{error.username}</p>}
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {error.password && <p>{error.password}</p>}
            </div>
            <button type="submit">OK</button>
            {error.complete && <p>{error.complete}</p>}
        </form>
            <button onClick={() => navigate("/")}>sign-in</button>
        </div>
    )
}

export default Signup;
