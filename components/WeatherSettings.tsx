import Head from "next/head";

import { useState, useEffect } from "react";

import styled from "styled-components";

function getTemperatureUnit(): "F" | "C" {
  if (typeof window == "undefined") return;
  return localStorage.getItem("tabatha_temperature_unit") as "F" | "C";
}

export default function WeatherSettings({
  closeMenu,
  zip,
  setZip,
  tempUnit,
  setTempUnit,
}: {
  zip: string;
  setZip: (zip: string) => void;
  tempUnit: "F" | "C";
  setTempUnit: (unit: "F" | "C") => void;
  closeMenu: () => void;
}) {
  function setZipCode(zipCode: string) {
    setZip(zipCode);
    localStorage.setItem("tabatha_zip_code", zipCode);
  }

  function switchUnit(unit: "F" | "C") {
    setTempUnit(unit);
    localStorage.setItem("tabatha_temperature_unit", unit);
  }

  return (
    <Container>
      <Heading>
        <HeadingText>Weather Settings</HeadingText>
        <CloseButton onClick={closeMenu}>X</CloseButton>
      </Heading>
      <Sections>
        <SetLocation>
          <OptionTitle>Set ZIP Code</OptionTitle>
          <RightSection>
            <ZipEntry
              value={zip}
              onChange={(e) => setZipCode(e.target.value)}
            ></ZipEntry>
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
          <OptionTitle>Disable Temperature</OptionTitle>
          <RightSection>
            <ToggleButton onClick={(e) => setZipCode("")}>Disable</ToggleButton>
          </RightSection>
        </ToggleTemperature>
      </Sections>
    </Container>
  );
}

const Container = styled.div`
  background-color: #242323;
  width: 500px;
  height: 215px;
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
  border-bottom: 1px solid #ffffff15;
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

const TemperatureUnit = styled.div`
  border-bottom: 1px solid #ffffff15;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SetLocation = styled.div`
  border-bottom: 1px solid #ffffff15;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionTitle = styled.h3`
  font-size: 18px;
  margin: 10px;
`;

const ToggleTemperature = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ZipEntry = styled.input`
  width: 80px;
  height: 25px;
  border-radius: 7px;
  padding: 10px;
  text-align: center;
  border: none;
  margin-right: 10px;
  color: #ffffff;
  background-color: #1d1d1d;
`;

const ToggleButton = styled.button`
  width: 80px;
  height: 25px;
  border-radius: 7px;
  color: #ffffff;
  background-color: red;
  border: none;
  margin-right: 10px;
`;
