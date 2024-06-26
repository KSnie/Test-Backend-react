import React, { useState , useEffect} from 'react';
import validation from "./SignupValidation";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [data, setData] = useState({})
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
  
    if (Object.values(validationErrors).every((error) => error === "")) {
      const res = await axios.post('http://localhost:3000/login', values);
  
      if (res.data === "error") {
        setError({ username: '', password: '', notfound: 'Username or password is incorrect' });
      } else {
        setData(res.data);
        setError({ username: '', password: '', notfound: '' });
      }
    } else {
      setError(validationErrors);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h3>Sign-in</h3>
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
        {error.notfound && <p>{error.notfound}</p>}
      </form>
      
      <button onClick={() => navigate("/signup")}>sign-up</button>
    </div>
  );
}

export default Login;
