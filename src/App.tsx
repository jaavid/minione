import { useRef, useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import {
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { ScoreData } from "./interface/ScoreData";
import CountUp from "react-countup";
import {
  Skeleton,
  Carousel,
  Tour,
  TourProps,
  Card,
  Badge,
  Avatar,
  Space,
  Row,
  Col,
  Statistic,
  Typography,
  Watermark
} from "antd";
import {
  QuestionCircleOutlined,
  SyncOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { valueType, FormatConfig } from "antd/lib/statistic/utils";
const { Title } = Typography;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const userdata = WebApp.initDataUnsafe;

  var items = [
    {
      icon: "💧",
      description: "عنصر زندگی",
      name: "آب",
      win: ["🔥", "🌍"],
      lose: [],
      equal: ["🌬️"],
      extrawin: "🌍",
      extraelement: "🌳",
    },
    {
      icon: "🌍",
      description: "عنصر رویش",
      name: "زمین",
      win: ["🔥", "🌍"],
      lose: ["🔥"],
      equal: ["🌬️"],
      extrawin: "💧",
      extraelement: "🌳",
    },
    {
      icon: "🔥",
      description: "عنصر خشم",
      name: "آتش",
      win: ["🔥", "🌍"],
      lose: ["💧"],
      equal: ["🌬️"],
      extrawin: "🌬️",
      extraelement: "☀️",
    },
    {
      icon: "🌬️",
      description: "عنصر نفس",
      name: "باد",
      win: ["🔥", "🌍"],
      lose: [],
      equal: ["🌬️"],
      extrawin: "🔥",
      extraelement: "☀️",
    },
  ];

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
      const response = await fetch(
        `https://api.rahomaskan.com/api/score?tgid=${userId}`,
      );
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
    if (typeof value === "number") {
      return <CountUp end={value} separator="," />;
    }
    // Handle the case where value is not a number
    return value;
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "درخت",
      description:
        "اینجا تعداد درختی که در حین بازی پیدا کردید را میبینید، در هربار برخورد زمین و آب شما یک درخت دریافت میکنید..",
      target: () => ref1.current,
      nextButtonProps: {
        children: "بعدی",
      },
    },
    {
      title: "نور",
      description:
        "اینجا نورهایی که در حین بازی پیدا کردید را میبینید، در هربار برخورد باد و آتش شما یک درخت دریافت میکنید.",
      target: () => ref2.current,
      nextButtonProps: {
        children: "بعدی", // Custom Next Button Text
      },
      prevButtonProps: {
        children: "قبلی", // Custom Previous Button Text
      },
    },
    {
      title: "عناصر",
      description:
        "این تعداد عناصر برای بازی در حال حاضر در اکانت شما موجود هستند",
      target: () => ref3.current,
      nextButtonProps: {
        children: "تمام", // Custom Next Button Text
      },
      prevButtonProps: {
        children: "قبلی", // Custom Previous Button Text
      },
    },
  ];
  const gridStyle: React.CSSProperties = {
    width: '50%',
    textAlign: 'center',
  };
  // const contentStyle: React.CSSProperties = {
  //   height: '160px',
  //   color: '#fff',
  //   lineHeight: '160px',
  //   textAlign: 'center',
  //   background: '#364d79',
  // };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Space>
            <Avatar shape="square" icon={<UserOutlined />} />
            {isLoading ? (
              <>
                <SyncOutlined spin />
              </>
            ) : scoreData ? (
              <>
                <Statistic
                  prefix="💰"
                  valueStyle={{ color: "#ffffff" }}
                  value={scoreData.score > 0 ? scoreData.score : 0}
                  formatter={formatter}
                />
              </>
            ) : null}
          </Space>
          <Title level={5} style={{textAlign:'center', color:'white', flexGrow:'1'}}>نسخه بتا</Title>

          {isLoading ? (
            <>
              <IconButton edge="end" color="inherit">
                <SyncOutlined spin />
              </IconButton>
            </>
          ) : scoreData ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="chat"
                onClick={() => setOpen(true)}
              >
                <QuestionCircleOutlined />
              </IconButton>
            </>
          ) : null}
          <IconButton
            edge="end"
            color="error"
            aria-label="close"
            onClick={() => WebApp.close()}
          >
            <CloseOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
   
        {isLoading ? (
          <Skeleton active />
        ) : scoreData ? (
          <>
            {/* <Carousel NextIcon={<RightOutlined />} PrevIcon={<LeftOutlined />}>
              {
                  items.map( (item, i) => <Item key={i} item={item} /> )
              }
          </Carousel>  */}

            <Carousel dotPosition="right" autoplay={true} autoplaySpeed={2000} style={{ height: "250px" }}>
              
              {items.map((item) => (
                <div>
                  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                    <Watermark gap={[20,20]} height={30} width={50} content={item.icon} font={{ fontSize: 20}} >
                      <Card style={{ fontFamily:"Vazirmatn", height: "220px", background: "#364d79" }}>
                        <Title style={{color:"white"}}>{item.name}</Title>
                      </Card>
                    </Watermark>                    
                    </Col>
                    <Col span={12}>
                      <Card style={{ fontFamily:"Vazirmatn", height: "220px"}} title={item.description}>
                      
                        <Card.Grid style={gridStyle} title="قوی‌تر از :">{item.win.join(", ")}</Card.Grid>
                        <Card.Grid style={gridStyle} title="ضعیف‌تر از :">{item.lose.join(", ")}</Card.Grid>
                        <Card.Grid style={gridStyle} title="برابر با :">{item.equal.join(", ")}</Card.Grid>
                        <Card.Grid style={gridStyle} title="تولید :">{item.extraelement} با {item.extrawin}</Card.Grid>
                      
                      </Card>
                    </Col>
                  </Row>
                  </Space>
                </div>
              ))}
            </Carousel>

            <Space size={64}>
              <Row>
                <Col span={12}>
                  <Card bordered={false} ref={ref1}>
                    <Statistic
                      title="درختان"
                      value={scoreData.tree}
                      precision={0}
                      valueStyle={{ color: "#3f8600" }}
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
                      valueStyle={{ color: "#fcda56" }}
                      suffix="☀️"
                    />
                  </Card>
                </Col>
              </Row>
            </Space>
            <br />
            <br />
            <Space size={64} ref={ref3}>
              <Avatar.Group>
                <Badge
                  count={scoreData.wind > 0 ? scoreData.wind : "۰"}
                  overflowCount={50}
                >
                  <Avatar size={64}>🌬️</Avatar>
                </Badge>
                <Badge
                  count={scoreData.water > 0 ? scoreData.water : "۰"}
                  overflowCount={50}
                >
                  <Avatar size={64}>💧</Avatar>
                </Badge>
                <Badge
                  count={scoreData.fire > 0 ? scoreData.fire : "۰"}
                  overflowCount={50}
                >
                  <Avatar size={64}>🔥</Avatar>
                </Badge>
                <Badge
                  count={scoreData.earth > 0 ? scoreData.earth : "۰"}
                  overflowCount={50}
                >
                  <Avatar size={64}>🌍</Avatar>
                </Badge>
              </Avatar.Group>
            </Space>
          </>
        ) : null}
      
      
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
}
export default App;
