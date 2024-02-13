// src/pages/HomePage.tsx
import React from "react";
import { useRef, useState, useEffect } from "react";
import "../App.css";
import WebApp from "@twa-dev/sdk";
import { ScoreData } from "../interface/ScoreData";
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
  Watermark,
} from "antd";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

const { Title } = Typography;
const HomePage: React.FC = () => {
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
    if (userdata?.user?.id) {
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
    width: "50%",
    textAlign: "center",
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton active />;
    }
    if (!scoreData) {
      return null;
    }
    return (
      <>
        <Carousel
          dotPosition="right"
          autoplay={true}
          autoplaySpeed={2000}
          style={{ height: "250px" }}
        >
          {items.map((item) => (
            <div key={item.name}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Watermark
                      gap={[20, 20]}
                      height={30}
                      width={50}
                      content={item.icon}
                      font={{ fontSize: 20 }}
                    >
                      <Card
                        style={{
                          fontFamily: "Vazirmatn",
                          height: "220px",
                          background: "#364d79",
                        }}
                      >
                        <Title style={{ color: "white" }}>{item.name}</Title>
                      </Card>
                    </Watermark>
                  </Col>
                  <Col span={12}>
                    <Card
                      style={{ fontFamily: "Vazirmatn", height: "220px" }}
                      title={item.description}
                    >
                      <Card.Grid style={gridStyle} title="قوی‌تر از :">
                        {item.win.join(", ")}
                      </Card.Grid>
                      <Card.Grid style={gridStyle} title="ضعیف‌تر از :">
                        {item.lose.join(", ")}
                      </Card.Grid>
                      <Card.Grid style={gridStyle} title="برابر با :">
                        {item.equal.join(", ")}
                      </Card.Grid>
                      <Card.Grid style={gridStyle} title="تولید :">
                        {item.extraelement} با {item.extrawin}
                      </Card.Grid>
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
            <Link to="/elements/wind">
              <Badge
                count={scoreData.wind > 0 ? scoreData.wind : "۰"}
                overflowCount={50}
              >
                <Avatar size={64}>🌬️</Avatar>
              </Badge>
            </Link>

            <Link to="/elements/water">
              <Badge
                count={scoreData.water > 0 ? scoreData.water : "۰"}
                overflowCount={50}
              >
                <Avatar size={64}>💧</Avatar>
              </Badge>
            </Link>

            <Link to="/elements/fire">
              <Badge
                count={scoreData.fire > 0 ? scoreData.fire : "۰"}
                overflowCount={50}
              >
                <Avatar size={64}>🔥</Avatar>
              </Badge>
            </Link>

            <Link to="/elements/earth">
              <Badge
                count={scoreData.earth > 0 ? scoreData.earth : "۰"}
                overflowCount={50}
              >
                <Avatar size={64}>🌍</Avatar>
              </Badge>
            </Link>
          </Avatar.Group>
        </Space>
      </>
    );
  };

  return (
    <>
      <Navigation />
      {renderContent()}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default HomePage;
