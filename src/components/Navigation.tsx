// src/components/Navigation.tsx
import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Statistic, Avatar, Space } from "antd";
import {
  HomeOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScoreData } from "../interface/ScoreData";
import WebApp from "@twa-dev/sdk";
import CountUp from "react-countup";
const userdata = WebApp.initDataUnsafe;

export const Navigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
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
      const response = await fetch(
        `https://api.rahomaskan.com/api/score?tgid=${userId}`,
      );
      const data = await response.json();
      setScoreData(data[0]); // Assuming the API returns an array with one object
    } catch (error) {
      console.error("Error fetching score data:", error);
    } finally {
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
  const displayscores = isLoading ? (
    <SyncOutlined spin />
  ) : scoreData ? (
    <>
    <Avatar shape="circle">💰</Avatar>
    <Statistic
      valueStyle={{ color: "#ffffff" }}
      value={scoreData.score > 0 ? scoreData.score : 0}
      formatter={formatter}
    />
    </>
  ) : null;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Space>
          <Link to="/">
            <Avatar shape="square" icon={<HomeOutlined />} />
          </Link>
          <Link to="/ranking">
            <Avatar shape="square" icon={<OrderedListOutlined />} />
          </Link>
          <Link to="/profile">
            <Avatar shape="square" icon={<UserOutlined />} />
          </Link>
          <Link to="/profile">
            <Avatar shape="square" icon={<QuestionCircleOutlined />} />
          </Link>
          {displayscores}
        </Space>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
