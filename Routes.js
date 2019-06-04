import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from "./src/pages/Login";
import Menu from "./src/pages/Menu";
import Preferences from "./src/pages/Preferences";

const Project= createStackNavigator({
  Login: {
   screen: Login
  },
  Menu: {
   screen: Menu
  },
  Preferences: {
    screen: Preferences
   },
   initialRoute : Login
});

export default createAppContainer(Project);