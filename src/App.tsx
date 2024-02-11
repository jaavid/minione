import { useState, useEffect } from 'react';
import './App.css'
import WebApp from '@twa-dev/sdk'
import { AppBar, Toolbar, IconButton, Typography, Card, CardContent, Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import {Person} from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ScoreData } from './interface/ScoreData';
import Carousel from 'react-material-ui-carousel';
import { Steps } from 'antd';
import { ShrinkOutlined, FireOutlined, GlobalOutlined ,CodeSandboxOutlined } from '@ant-design/icons';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const userdata = WebApp.initDataUnsafe;
  
  var items = [
    {
        icon: "💧",
        description:"عنصر زندگی",
        name: "آب",
        win:['🔥','🌍'],
        lose:[],
        equal:['🌬️'],
        extrawin:'🌍',
        extraelement:'🌳'
    },
    {
        icon: "🌍",
        description:"عنصر رویش",
        name: "زمین",
        win:['🔥','🌍'],
        lose:['🔥'],
        equal:['🌬️'],
        extrawin:'💧',
        extraelement:'🌳'
    },
    {
      icon: "🔥",
      description:"عنصر خشم",
      name: "آتش",
      win:['🔥','🌍'],
      lose:['💧'],
      equal:['🌬️'],
      extrawin:'🌬️',
      extraelement:'☀️'
  },
  {
      icon: "🌬️",
      description:"عنصر نفس",
      name: "باد",
      win:['🔥','🌍'],
      lose:[],
      equal:['🌬️'],
      extrawin:'🔥',
      extraelement:'☀️'
  }
]

  useEffect(() => {
    if (userdata && userdata.user?.id) {
      fetchScoreData(userdata.user.id);
    } else {
      fetchScoreData(208627);
    }
  }, [userdata]);

  const fetchScoreData = async (userId: number) => {
    setIsLoading(true); // Set loading to true when fetch starts
    try {
      WebApp.MainButton.showProgress(true); // Show progress indicator on MainButton
      const response = await fetch(`https://api.rahomaskan.com/api/score?tgid=${userId}`);
      const data = await response.json();
      setScoreData(data[0]); // Assuming the API returns an array with one object
    } catch (error) {
      console.error("Error fetching score data:", error);
    } finally {
      WebApp.MainButton.hideProgress();
      setIsLoading(false); // Set loading to false when fetch ends
    }
  };


  // Rest of your component logic...

  return (
    <>
    <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="profile">
            {/* <Avatar alt="Profile Picture" src="/path/to/your/image.jpg" /> */}
            <Person></Person>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow:  1 }}>
            نسخه بتا
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="chat"><TelegramIcon/></IconButton>
          <IconButton edge="end" color="inherit" aria-label="close" onClick={() => WebApp.close()}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} />
      <br /><br />
      
      <div className="card">
        {isLoading ?
          (
            <div className="progress-bar">  </div> // Simple progress bar
          ) : scoreData ? (
            <>       
            <Carousel NextIcon={<ArrowBackIosNewIcon/>} PrevIcon={<ArrowForwardIosIcon/>}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel> 
            <Grid container spacing={2}>
              <Grid xs={12}><Card>
                <CardContent>
                  <Typography variant="h2">
                    💰  {scoreData.score}
                    </Typography>
                    </CardContent>
              </Card>
              </Grid>
              <Grid xs={6}><Card>
                <CardContent>
                <Steps direction="vertical" current={3} size="small" items={[{title: 'عنصر زمین',icon: <GlobalOutlined />},{title: ' در برخورد با آب',description:'یا برعکس',icon: <ShrinkOutlined />},{title: 'یک درخت می‌سازد',icon: <CodeSandboxOutlined />},]}/>
                  <Typography variant="h3">
                  🌳<br />
                  {scoreData.tree}
                  </Typography>              
                </CardContent>
              </Card>
              </Grid>
              <Grid xs={6}><Card>
                <CardContent>
                <Steps direction="vertical" current={3} size="small" items={[{title: 'عنصر آتش',icon: <FireOutlined />},{title: ' در برخورد با باد',description:'یا برعکس',icon: <ShrinkOutlined />},{title: 'یک نور می‌سازد',icon: <CodeSandboxOutlined />},]}/>
                  <Typography variant="h3">
                    ☀️<br />
                    {scoreData.light}
                  </Typography>
                  </CardContent>
              </Card>
              </Grid>
              <Grid xs={3}><Card raised={true}>
              <CardContent style={{backgroundColor: "red", padding: "10px 0 0 0"}}>
                  <Typography variant="h4">
                    🌬️<br />
                    {scoreData.wind}
                    </Typography> </CardContent>
              </Card>
              </Grid>
              <Grid xs={3}><Card raised={true}>
                <CardContent style={{backgroundColor: "red", padding: "10px 0 0 0"}}>
                  <Typography variant="h4">
                    🔥<br />
                  {scoreData.fire}
                  </Typography>
                  </CardContent>
              </Card>
              </Grid>
              <Grid xs={3}><Card raised={true}>
              <CardContent style={{backgroundColor: "red", padding: "10px 0 0 0"}}>
                  <Typography variant="h4">
                    🌍<br />
                    {scoreData.earth}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
              <Grid xs={3}><Card raised={true}>
              <CardContent style={{backgroundColor: "red", padding: "10px 0 0 0"}}>
                  <Typography variant="h4">
                    💧<br />
                    {scoreData.water}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
            </Grid>
            </>
          ) : null}
      </div>
      <Paper />
    </>
  );
}

interface ItemData {
  icon: string;
  description: string;
  name: string;
  win: string[];
  lose: string[];
  equal: string[];
  extrawin: string;
  extraelement: string;
}

interface ItemProps {
  item: ItemData;
}

function Item(props: ItemProps) 
{
  const { icon, description, name, win, lose, equal,extrawin, extraelement } = props.item;

    return (
      <Card variant="outlined">
      <CardContent >
          <Grid container spacing={2}>
              <Grid xs={6}>
                  <Typography variant="h2">{icon}</Typography>              
              </Grid>            
            <Grid xs={6}>
            <span style={{ fontWeight:  900, fontSize: '24px' }}>{name}</span>
              <br />
            {description}
              </Grid>
          </Grid>            
          <Grid container spacing={2}>
          <Grid xs={3}>
            <Typography variant="body1">
              قویتر از : {win.join('و ')}
            </Typography>
            </Grid>
            <Grid xs={3}>
            <Typography variant="body1">
              ضعیفتر از : {lose.join(', ')}
            </Typography>
            </Grid>
            <Grid xs={3}>
            <Typography variant="body1">
              برابر با : {equal.join(', ')}
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="body1">
              تولید {extraelement} با {extrawin}
            </Typography>
          </Grid>
        </Grid>
        </CardContent>
        </Card>
        
    )
}
export default App;