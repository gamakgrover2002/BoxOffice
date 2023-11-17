import { Link } from 'react-router-dom';
import { useState } from 'react';
function Login() {
  const [firstname, Setfirstname] = useState('');
  const [lastname, Setlastname] = useState('');
  const [username, Setusernamename] = useState('');
  const [password, Setpassword] = useState('');
  const [response, Setresponse] = useState('');
  const Registerdata = async () => {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      }),
    }).then(res => res.json());

    Setresponse('registered successfully');
    console.log(res);
    Setresponse(res.error);
  };
  const getfirstname = e => {
    Setfirstname(e.target.value);
  };
  const getlasttname = e => {
    Setlastname(e.target.value);
  };
  const getusername = e => {
    Setusernamename(e.target.value);
  };
  const getpassword = e => {
    Setpassword(e.target.value);
  };
  return (
    <div id="container">
      <div id="form">
        Firstname
        <br />
        <input type="text" onChange={getfirstname}></input>
        <br />
        Lastname
        <br />
        <input type="text" onChange={getlasttname}></input>
        <br />
        Username
        <br />
        <input type="text" onChange={getusername}></input>
        <br />
        Password
        <br />
        <input type="password" onChange={getpassword}></input>
        <br />
        <button id="button" onClick={Registerdata}>
          Login
        </button>
        <br />
        {response}
        <Link to="/">GLogin</Link>
        <br />
      </div>
    </div>
  );
}

export default Login;
