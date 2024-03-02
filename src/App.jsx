import React, { useState, useEffect } from 'react';
import './App.css';
import validation from "./SignupValidation";
import axios from 'axios';

function App() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [data, setData] = useState({})

  useEffect(() => {
    console.log(error.username);
    console.log(error.password);
  }, [error]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);

    if (Object.values(validationErrors).every((error) => error === "")) {

        axios.post('http://localhost:3000/login', values).then(res => {
          if (res.data === "faile") {
            setError({ username: '', password: '', notfound: 'Username or password is incorrect' });
          } else {
            setData(res.data);
            console.log(data);
            setError({ username: '', password: '', notfound: '' });
          }
        }).catch(err => console.log(err));

    } else {
      setError(validationErrors);
    }
  };

  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <h3>UserName</h3>
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
    </div>
  );
}

export default App;
