import { useState } from 'react';
import { browser } from 'wxt/browser';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import '../app.css';

function App() {
  const [count, setCount] = useState(0);

  const openOptionsPage = () => {
    browser.runtime.openOptionsPage();
  };

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button
        onClick={openOptionsPage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View All Features
      </button>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;