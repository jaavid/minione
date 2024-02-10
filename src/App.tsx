import { useState } from 'react'
import './App.css'
import WebApp from '@twa-dev/sdk'

function App() {
  const [count, setCount] = useState(0);
  const userdata = WebApp.initDataUnsafe;
  console.log(userdata);
  console.log(userdata.user?.id);
  console.log(WebApp);

  const MainButton = WebApp.MainButton;
  const BackButton = WebApp.BackButton;

  MainButton.setText('بازی');
  MainButton.show();
  MainButton.onClick(() => alert('submitted'));
  MainButton.color = '#000000';
  MainButton.textColor = '#FFFFFF';
  BackButton.show();
  BackButton.onClick(() => window.history.back());

  return (
    <>
      <h1>Elemental Game</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
        {/* Here we add our button with alert callback */}
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
        <button onClick={() => WebApp.showAlert(` ${userdata}`)}>
          Show User Data
        </button>
      </div>
    </>
  )
}

export default App