import { useState, useEffect } from 'react';
import './App.css'
import WebApp from '@twa-dev/sdk'
  const MainButton = WebApp.MainButton;
  const BackButton = WebApp.BackButton;

  MainButton.setText('بازی');
  MainButton.show();
  MainButton.onClick(() => alert('submitted'));
  MainButton.color = '#000000';
  MainButton.textColor = '#FFFFFF';
  BackButton.show();
  BackButton.onClick(() => window.history.back());

interface ScoreData {
  userid: number;
  score: number;
  tree: number;
  light: number;
  water: number;
  wind: number;
  fire: number;
  earth: number;
  id: number;
  telegramId: number;
  username: string;
  name: string;
  inviterid: null | number;
}

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const userdata = WebApp.initDataUnsafe;

  useEffect(() => {
    if (userdata && userdata.user?.id) {
      fetchScoreData(userdata.user.id);
    }
  }, [userdata]);

  const fetchScoreData = async (userId: number) => {
    setIsLoading(true); // Set loading to true when fetch starts
    try {
      const response = await fetch(`https://api.rahomaskan.com/api/score?tgid=${userId}`);
      const data = await response.json();
      setScoreData(data[0]); // Assuming the API returns an array with one object
    } catch (error) {
      console.error("Error fetching score data:", error);
    } finally {
      setIsLoading(false); // Set loading to false when fetch ends
    }
  };

  // Rest of your component logic...

  return (
    <>
      <h1>Elemental Game</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count +  1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        {isLoading ? (
          <div className="progress-bar">Loading...</div> // Simple progress bar
        ) : scoreData ? (
          <div className="score-data">
            <p>User ID: {scoreData.userid}</p>
            <p>Score: {scoreData.score}</p>
            {/* Add more fields as needed */}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;