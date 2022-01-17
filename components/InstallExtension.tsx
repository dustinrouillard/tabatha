import { useState } from "react";
import styled from "styled-components";
import { ChromeIcon } from "./ChromeIcon";
import { FirefoxIcon } from "./FirefoxIcon";

export function ExtensionInstall() {
  const [browser] = useState<"chrome" | "firefox">(() => {
    if (typeof window == "undefined") return "firefox";
    return typeof (window as any).InstallTrigger !== "undefined"
      ? "firefox"
      : "chrome";
  });

  function openExtension(browser: "chrome" | "firefox") {
    window.open(`https://dstn.to/tab-${browser}`, "_blank");
    return;
  }

  return (
    <Outter>
      <Container>
        <Title>Download the extension</Title>
        <Subtitle>
          Using the extension will make the experience better, and removes this
          message
        </Subtitle>
        <DownloadButton onClick={() => openExtension(browser)}>
          <IconWrapper>
            {browser == "chrome" ? <ChromeIcon /> : <FirefoxIcon />}
          </IconWrapper>{" "}
          Download for {browser == "chrome" ? "Chrome" : "Firefox"}
        </DownloadButton>
        <OtherBrowser
          onClick={() =>
            openExtension(browser == "chrome" ? "firefox" : "chrome")
          }
        >
          Using {browser == "chrome" ? "Firefox" : "Chrome"}?
        </OtherBrowser>
      </Container>
    </Outter>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #271f1f;
  border-radius: 0 0 10px 10px;

  width: fit-content;
  height: fit-content;

  align-items: center;

  padding: 30px;
`;

const Outter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
`;

const Title = styled.h3`
  color: #ffffff;
  margin: 0;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #ffffff;
  margin: 0;
`;

const DownloadButton = styled.div`
  width: fit-content;
  padding: 15px;
  height: 40px;
  margin-top: 20px;
  color: #ffffff;
  background-color: #3389ec;
  border-radius: 10px;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  :hover {
    filter: brightness(50%);
    cursor: pointer;
  }
`;

const OtherBrowser = styled.p`
  margin: 0;
  margin-top: 5px;
  font-size: 15px;
  color: #ffffff;
  opacity: 0.6;

  :hover {
    filter: brightness(50%);
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 5px;
  font-size: 18px;
`;
