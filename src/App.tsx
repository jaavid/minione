import { useState, useEffect } from 'react';
import './App.css'
import WebApp from '@twa-dev/sdk'

WebApp.expand();

  const MainButton = WebApp.MainButton;
  const BackButton = WebApp.BackButton;
  const SettingsButton = WebApp.SettingsButton;

  MainButton.setText('بازی');
  MainButton.show();
  MainButton.onClick(() => alert('submitted'));
  MainButton.color = '#000000';
  MainButton.textColor = '#FFFFFF';


  BackButton.show();
  BackButton.onClick(() => window.history.back());

  SettingsButton.isVisible = true;

  WebApp.setHeaderColor('#000000');
  WebApp.setBackgroundColor('#000000');

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
      MainButton.showProgress(true); // Show progress indicator on MainButton
      const response = await fetch(`https://api.rahomaskan.com/api/score?tgid=${userId}`);
      const data = await response.json();
      setScoreData(data[0]); // Assuming the API returns an array with one object
    } catch (error) {
      console.error("Error fetching score data:", error);
    } finally {
      MainButton.hideProgress();
      setIsLoading(false); // Set loading to false when fetch ends
    }
  };

  // Rest of your component logic...

  return (
    <>
      <h1>برخورد عناصر</h1>
      <div className="card">
        {isLoading ? 
        (
          <div className="progress-bar">  </div> // Simple progress bar
        ) : scoreData ? (
          <div className="score-data">
            <p>User ID: {scoreData.userid}</p>
            <p>امتیاز: {scoreData.score}</p>
            <p>درخت: {scoreData.tree}</p>
            <p>نور: {scoreData.light}</p>
            <p>آب: {scoreData.water}</p>
            <p>باد: {scoreData.wind}</p>
            <p>زمان: {scoreData.earth}</p>
            <p>آتش: {scoreData.fire}</p>
            {/* Add more fields as needed */}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;