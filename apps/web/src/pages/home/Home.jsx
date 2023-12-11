import { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './Home.css';

function Home() {
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/sample`,
      );
      setSampleData(data);
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Purwadhika Final Project Template using Vite + React</h1>
      <h3>Test Data</h3>
      {sampleData.map((data, idx) => (
        <div key={idx.toString()}>{data.name}</div>
      ))}
    </>
  );
}

export default Home;
