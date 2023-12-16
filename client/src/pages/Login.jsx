import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login() {
  const [username, Setusername] = useState('');
  const [password, Setpassword] = useState('');

  const navigate = useNavigate();
  const getusername = e => {
    Setusername(e.target.value);
  };
  const getpassword = e => {
    Setpassword(e.target.value);
  };
  const Loginuser = async () => {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then(res => res.json());
      console.log(res);
      if (res.status == 'error') {
        alert('invalid details');
      } else {
        navigate(`/home/${username}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="container">
      <div id="form">
        Username
        <br />
        <input type="text" onChange={getusername}></input>
        <br />
        Password
        <br /> <input type="password" onChange={getpassword}></input>
        <br />
        <button id="button" onClick={Loginuser}>
          Login
        </button>
        <br />
        <br />
        <h6>
          Register youself here <Link to="/register">Click Here</Link>
        </h6>
        <br />
      </div>
    </div>
  );
}

export default Login;
