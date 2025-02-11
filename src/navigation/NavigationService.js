import routes from "./routes";
import {CommonActions, StackActions} from "@react-navigation/native";
import React from "react";
import {Linking} from "react-native";

export const navigationRef = React.createRef();

export const openLink = (url) => {
    const supported = Linking.canOpenURL(url);
    if (supported) {
        Linking.openURL(url);
    }
};
function getCurrentRouteName() {
    if (navigationRef?.current?.getCurrentRoute()?.name == null ||
        navigationRef?.current?.getCurrentRoute()?.name === undefined) {
        return "UNDEFINED";
    }
    return navigationRef?.current?.getCurrentRoute()?.name;
}

function replaceWithPageName(screenName, params) {
    if (screenName === "") {
        console.warn("Can't push, name or screen are empty.");
        return;
    }
    navigationRef.current?.dispatch(StackActions.replace(screenName, params));
}
function navigateModal(modalName = '', params = {}) {
    if (modalName === "") {
        console.warn("Can't push, name or screen are empty.");
        return;
    }
    navigationRef.current?.dispatch(CommonActions.navigate(modalName, params));
}

function navigateToScreenName(screenName = '', params = {}) {
    //const routeName = getCorrectRoute(screenName, "", params) || "";
    if (screenName === "") {
        console.warn("Can't push, name or screen are empty.");
        return;
    }
    navigationRef.current?.dispatch(CommonActions.navigate(screenName, params));
}

function back() {
    if (navigationRef.current?.canGoBack()) {
        navigationRef.current?.dispatch(CommonActions.goBack());
    } else {
        navigationRef.current?.dispatch(StackActions.replace(routes.Home));
    }
}

function popToTop() {
    if (navigationRef.current?.canGoBack()) {
        navigationRef.current?.dispatch(StackActions.popToTop());
    } else {
        navigationRef.current?.dispatch(StackActions.replace(routes.Home));
    }
}

function pop() {
    if (navigationRef.current?.canGoBack()) {
        navigationRef.current?.dispatch(StackActions.pop());
    }
}

export default {
    navigateModal,
    back,
    popToTop,
    pop,
    navigateToScreenName,
    replaceWithPageName,
    getCurrentRouteName,
};
