import { useRef, useState, useEffect } from 'react';
import './App.css'
import WebApp from '@twa-dev/sdk'
import { AppBar, Toolbar, IconButton, Typography, CardContent, Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ScoreData } from './interface/ScoreData';
import Carousel from 'react-material-ui-carousel';
import CountUp from 'react-countup';
import { Tour, TourProps , Card, Badge, Steps, Avatar, Space, Row, Col, Statistic } from 'antd';
import { QuestionCircleOutlined, SyncOutlined, LeftOutlined, RightOutlined,CloseSquareOutlined, RobotOutlined, UserOutlined, ShrinkOutlined, FireOutlined, GlobalOutlined ,CodeSandboxOutlined } from '@ant-design/icons';
import { valueType, FormatConfig } from 'antd/lib/statistic/utils';

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

  // const formatter = (value: number) => <CountUp end={value} separator="," />;
  // @ts-ignore
  const formatter = (value: valueType, config?: FormatConfig) => {
    // Ensure the value is a number before using it in CountUp
    if (typeof value === 'number') {
      return <CountUp end={value} separator="," />;
    }
    // Handle the case where value is not a number
    return value;
  };
  




  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'درخت',
      description: 'اینجا تعداد درختی که در حین بازی پیدا کردید را میبینید.',
      target: () => ref1.current,
      nextButtonProps: {
        children: 'بعدی', 
      },
    },
    {
      title: 'نور',
      description: 'اینجا نورهایی که در حین بازی پیدا کردید را میبینید',
      target: () => ref2.current,
      nextButtonProps: {
        children: 'بعدی', // Custom Next Button Text
      },
      prevButtonProps: {
        children: 'قبلی', // Custom Previous Button Text
      },
    },
    {
      title: 'عناصر',
      description: 'این تعدا عناصر برای بازی در حال حاضر در اکانت شما موجود هستند',
      target: () => ref3.current,
      nextButtonProps: {
        children: 'تمام', // Custom Next Button Text
      },
      prevButtonProps: {
        children: 'قبلی', // Custom Previous Button Text
      },
    },
  ];



  return (
    <>
    <AppBar position="fixed">
        <Toolbar>
          
                   
              <Space>
                <Avatar shape="square" icon={<UserOutlined />} />
                {isLoading? (
                <><SyncOutlined spin /></>
                ): scoreData ? (
                <>
                <Statistic 
                  prefix='💰'
                  valueStyle={{ color: '#ffffff' }}
                  value={scoreData.score >  0 ? scoreData.score :  0}
                  formatter={formatter}
                />
                </>
                ) : null}
              </Space>
          
          

          <Typography variant="h6" sx={{ flexGrow:  1 }}>
            نسخه بتا
          </Typography>
          
          <IconButton edge="end" color="inherit" aria-label="chat" onClick={() => setOpen(true)}><QuestionCircleOutlined /></IconButton>
          <IconButton edge="end" color="inherit" aria-label="chat"><RobotOutlined /></IconButton>
          <IconButton edge="end" color="inherit" aria-label="close" onClick={() => WebApp.close()}>
            <CloseSquareOutlined />
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
            <Carousel NextIcon={<RightOutlined />} PrevIcon={<LeftOutlined />}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel> 
            <br /><br />
            <Row>
              <Col>
              <Steps direction="vertical" current={3} size="small" items={[{title: 'عنصر زمین',icon: <GlobalOutlined />},{title: ' در برخورد با آب',description:'یا برعکس',icon: <ShrinkOutlined />},{title: 'یک درخت می‌سازد',icon: <CodeSandboxOutlined />},]}/>
              </Col>
              <Col>
              <Steps direction="vertical" current={3} size="small" items={[{title: 'عنصر آتش',icon: <FireOutlined />},{title: ' در برخورد با باد',description:'یا برعکس',icon: <ShrinkOutlined />},{title: 'یک نور می‌سازد',icon: <CodeSandboxOutlined />},]}/>
              </Col>
            </Row>
              <Row gutter={2}>
                  <Col span={12}>
                    <Card bordered={false} ref={ref1}>
                      <Statistic
                        title="درختان"
                        value={scoreData.tree}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        suffix="🌳"
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false} ref={ref2}>
                      <Statistic
                        title="نورها"
                        value={scoreData.light}
                        precision={0}
                        valueStyle={{ color: '#fcda56' }}
                        suffix="☀️"
                      />
                    </Card>
                  </Col>
                </Row>
                <br /><br />
                <Space size={64} ref={ref3}>
                <Avatar.Group>
                  <Badge count={scoreData.wind > 0 ?  scoreData.wind : '۰'} overflowCount={50}>
                    <Avatar size={64}>🌬️</Avatar>
                  </Badge>
                  <Badge count={scoreData.water > 0 ?  scoreData.water : '۰'} overflowCount={50}>
                    <Avatar size={64}>💧</Avatar>
                  </Badge>
                  <Badge count={scoreData.fire > 0 ?  scoreData.fire : '۰'} overflowCount={50}>
                    <Avatar size={64}>🔥</Avatar>
                  </Badge>
                  <Badge count={scoreData.earth > 0 ?  scoreData.earth : '۰'} overflowCount={50}>
                    <Avatar size={64}>🌍</Avatar>
                  </Badge>
                  </Avatar.Group>
                </Space>

            </>
          ) : null}
      </div>
      <Paper />
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
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
      <Card>
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