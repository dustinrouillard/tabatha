import Head from "next/head";

import debounce from "lodash.debounce";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { SettingsIcon } from "../components/SettingsIcon";
import WeatherSettings from "../components/WeatherSettings";
import { Weather } from "../types/Weather";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getZipCode(): string {
  if (typeof window == "undefined") return;
  if (!localStorage.getItem("tabatha_zip_code"))
    localStorage.setItem("tabatha_zip_code", "");
  return localStorage.getItem("tabatha_zip_code");
}

function getTemperatureUnit(): "F" | "C" {
  if (typeof window == "undefined") return;
  if (!localStorage.getItem("tabatha_temperature_unit"))
    localStorage.setItem("tabatha_temperature_unit", "F");
  return localStorage.getItem("tabatha_temperature_unit") as "F" | "C";
}

let tempTimeout;

export default function Home() {
  const [greeting, setGreeting] = useState(
    new Date().getHours() >= 12 && new Date().getHours() < 18
      ? "Good afternoon."
      : new Date().getHours() < 12
      ? "Good morning."
      : "Good evening."
  );

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [date, setDate] = useState(days[new Date().getDay().toString()]);
  const [zip, setZip] = useState(getZipCode());
  const [temperature, setTemperature] = useState("0");
  const [tempUnit, setTempUnit] = useState(getTemperatureUnit());

  const [weatherSettingsVisible, showWeatherSettings] = useState(false);

  async function getTemperature(zip: string) {
    const data: Weather = await fetch(`https://weather.dstn.to/${zip}`).then(
      (r) => r.json()
    );
    const temp =
      tempUnit == "F"
        ? ((data.temperature.current - 273.15) * 9) / 5 + 32
        : tempUnit == "C"
        ? data.temperature.current - 273.15
        : data.temperature.current;
    setTemperature(temp.toFixed());
  }

  useEffect(() => {
    const int = setInterval(() => {
      const currentDate = new Date();
      setTime(
        currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setGreeting(
        currentDate.getHours() >= 12 && currentDate.getHours() < 18
          ? "Good afternoon."
          : currentDate.getHours() < 12
          ? "Good morning."
          : "Good evening."
      );

      setDate(days[currentDate.getDay().toString()]);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, []);

  useEffect(() => {
    getTemperature(zip);
  }, [tempUnit]);

  function changeTemp() {
    if (zip.length == 5) {
      if (tempTimeout) clearInterval(tempTimeout);
      tempTimeout = setInterval(async () => {
        getTemperature(zip);
      }, 30000);
      getTemperature(zip);
    }
  }

  useEffect(() => {
    changeTemp();
  }, [zip]);

  return (
    <>
      {weatherSettingsVisible && (
        <>
          <Darken onClick={() => showWeatherSettings(false)} />
          <ModalWrapped>
            <WeatherSettings
              closeMenu={() => showWeatherSettings(false)}
              zip={zip}
              setZip={setZip}
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
            />
          </ModalWrapped>
        </>
      )}
      <Container>
        <Head>
          <title>Tabatha • New Tab</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Content>
          <TopRightContent>
            <Settings onClick={() => showWeatherSettings(true)} />
          </TopRightContent>
          <TopLeftContent>
            {zip && temperature != "0" && (
              <Temperature>
                {temperature}° {tempUnit}
              </Temperature>
            )}
          </TopLeftContent>
          <BottomRightContent>
            <ContentHeading>
              <Title>{greeting}</Title>
            </ContentHeading>
            <ContentBody right>
              <CurrentDate>{date}</CurrentDate> <Seperator>•</Seperator>{" "}
              <Time>{time}</Time>
            </ContentBody>
          </BottomRightContent>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopRightContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 50px;
  right: 0;
  top: 0;
`;

const TopLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 50px;
  left: 0;
  top: 0;
`;

const BottomRightContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 50px;
  right: 0;
  bottom: 0;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 3.5rem;
  text-align: right;
`;

const Temperature = styled.p`
  margin: 0;
  font-weight: bold;
  line-height: 1.5;
  font-size: 1.5rem;
  opacity: 0.5;
`;

const Time = styled.p`
  margin: 0;
  font-weight: bold;
  text-align: right;
  line-height: 1.5;
  font-size: 2rem;
`;

const CurrentDate = styled.p`
  margin: 0;
  font-weight: bold;
  text-align: right;
  line-height: 1.5;
  font-size: 2rem;
`;

const Seperator = styled.p`
  margin: 0;
  font-size: 1.2rem;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
  text-align: right;
`;

const ContentBody = styled.div<{ right?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;

const ContentHeading = styled.div`
  display: flex;
  flex-direction: column;
`;

const Darken = styled.div`
  background-color: #000000c3;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
`;

const Settings = styled(SettingsIcon)`
  opacity: 0.3;

  :hover {
    opacity: 0.75;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ModalWrapped = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
`;
