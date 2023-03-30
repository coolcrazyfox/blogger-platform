import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PreloaderTest from "../components/UI/Preloader/PreloaderTest";
import InformationPanelTest from "../components/UI/Test/UI/SettingsTest/InformationPanelTest";
import { selectStatus } from "../redux/selectors/app-selectors";
//@ts-ignore
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themE } from "./../components/UI/Theme/ThemeTS/theme";

export enum pathSiteBarEnum {
  main = "/",
  blogs = "/",
  posts = "/posts",
  users = "/users",
  postsOfBlog = "/postsOfBlog/:blogId",
  postPage = "/postPage/:id",
  oneBlogPage = "/oneBlogPage/:id",
  login = "/login",
}

type themeMode = "day" | "night";
const Settings = () => {
  const appStatus = useSelector(selectStatus);

  let [isActive, setIsActive] = useState<boolean>(false);
  let [theme, setTheme] = useState<string>("light" || "");
  //ThemeTS
  const [modeState, setModeState] = useState<themeMode>("day");
  useEffect(() => {
    const localTheme: string = localStorage.getItem("react-theme") || "day";
    setMode(localTheme as themeMode);
  }, []);
  const setMode = (mode: themeMode) => {
    localStorage.setItem("react-theme", mode);
    setModeState(mode);
  };
  const toggleTheme = () => {
    modeState === "night" ? setMode("day") : setMode("night");
  };

  let title = "name platform";
  const onClickHandler = () => {
    setTheme("");
  };
  return (
    <div
      style={
        theme === "light"
          ? {
              background: "black",
              display: "flex",
              height: "100vh",
              color: "white",
            }
          : { background: "blue" }
      }
    >
      <ThemeProvider themE={themE[modeState]}>
        <GlobalStyle />
        <h1>Hello</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </ThemeProvider>
      <Header title={title} theme={theme} setTheme={setTheme} />
      <div>{appStatus === "loading" && <PreloaderTest />}</div>
      <NavBar theme={theme} isActives={isActive} setIsActives={setIsActive} />
      <InformationPanelTest label={title} onClicked={onClickHandler} />
    </div>
  );
};

export default Settings;
