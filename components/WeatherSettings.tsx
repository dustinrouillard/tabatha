import React from "react";

import styled from "styled-components";

export default function WeatherSettings({
  closeMenu,
  coords,
  temperatureEnabled,
  setTemperatureEnabled,
  updateGeolocation,
  tempUnit,
  setTempUnit,
}: {
  coords: { lat: number; lon: number };
  temperatureEnabled: boolean;
  setTemperatureEnabled: (value: boolean) => void;
  updateGeolocation: () => void;
  tempUnit: "F" | "C";
  setTempUnit: (unit: "F" | "C") => void;
  closeMenu: () => void;
}) {
  function switchUnit(unit: "F" | "C") {
    setTempUnit(unit);
    localStorage.setItem("tabatha_temperature_unit", unit);
  }

  function toggleTemperature(value: boolean) {
    setTemperatureEnabled(value);
    localStorage.setItem("tabatha_weather_enabled", value.toString());
  }

  return (
    <Container>
      <Heading>
        <HeadingText>Weather Settings</HeadingText>
        <CloseButton onClick={closeMenu}>X</CloseButton>
      </Heading>
      <Sections>
        <SetLocation>
          <LeftSection>
            <OptionTitle>Current Location</OptionTitle>
            <OptionSubtitle>
              {coords.lat && coords.lon
                ? `Current location is set to (${coords.lat}, ${coords.lon})`
                : "Current location is not set."}
            </OptionSubtitle>
          </LeftSection>
          <RightSection>
            <ToggleButton onClick={(e) => updateGeolocation()} blue>
              Find me
            </ToggleButton>
          </RightSection>
        </SetLocation>
        <TemperatureUnit>
          <OptionTitle>Temperature Unit</OptionTitle>
          <RightSection>
            <UnitOptions
              value={tempUnit}
              onChange={(e) => switchUnit(e.target.value as "F" | "C")}
            >
              <UnitOption value="F">F°</UnitOption>
              <UnitOption value="C">C°</UnitOption>
            </UnitOptions>
          </RightSection>
        </TemperatureUnit>
        <ToggleTemperature>
          <OptionTitle>
            {temperatureEnabled ? "Disable" : "Enable"} Temperature
          </OptionTitle>
          <RightSection>
            <ToggleButton
              onClick={(e) => toggleTemperature(!temperatureEnabled)}
              red={temperatureEnabled}
              blue={!temperatureEnabled}
            >
              {temperatureEnabled ? "Disable" : "Enable"}
            </ToggleButton>
          </RightSection>
        </ToggleTemperature>
      </Sections>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(27, 29, 30);
  width: 500px;
  height: auto;
  border-radius: 8px;
  margin: auto;
  padding: 15px;
  z-index: 100;
`;

const HeadingText = styled.h2`
  margin: 0;
`;

const Heading = styled.div`
  padding: 10px;
  justify-content: space-between;

  display: flex;
`;

const UnitOptions = styled.select`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 15px;
  width: 80px;
  height: 25px;
  border-radius: 7px;
  padding: 1px;
  text-align: center;
  border: none;
  margin-right: 10px;
  color: #ffffff;
  background-color: #1d1d1d;
`;

const UnitOption = styled.option``;

const CloseButton = styled.h2`
  display: flex;
  margin: 0;
  align-items: center;
  font-size: 20px;
  padding-right: 10px;
  opacity: 0.3;

  :hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TemperatureUnit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SetLocation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionTitle = styled.h3`
  font-size: 18px;
  margin: 10px;
  font-weight: normal;
`;

const OptionSubtitle = styled.h3`
  font-size: 12px;
  margin: 10px;
  margin-top: -10px;
  font-weight: normal;
`;

const ToggleTemperature = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ToggleButton = styled.button<{ blue?: boolean; red?: boolean }>`
  width: 80px;
  height: 25px;
  border-radius: 20px;
  color: #ffffff;
  background-color: ${(props) =>
    props.blue ? "blue" : props.red ? "red" : "gray"};
  border: none;
  margin-right: 10px;
`;
