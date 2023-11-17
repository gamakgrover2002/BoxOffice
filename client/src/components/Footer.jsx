import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  const [res, Setres] = useState([]);
  const getdata = async () => {
    const result = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
    const data = await result.json();
    Setres(data);
    console.log(res);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <Styleddiv>
        <marquee>
          <ul>
            {res.map(e => (
              <>
                <li key={e.show?.id}>
                  <Link to={`/show/${e.show.id}`}>
                    {' '}
                    <img src={e.show?.image?.medium} alt="img" id="img" />
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </marquee>
      </Styleddiv>
    </div>
  );
}

export default Footer;
const Styleddiv = styled.div`
width:100vw;
background-color: blue;
height:60vh;
  }
`;
