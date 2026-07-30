import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import TabBar from './TabBar';
import routes from './routes';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Explore from '../screens/Explore';
import Message from '../screens/Message';
import Profile from '../screens/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from './AuthContext';
import Header from './Header';

function AppNavigator() {
    const isDarkMode = useColorScheme() === 'dark';
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const {theme} = useAuth();

    const homePageContainer = props => ({
        header: () => <Header {...props} />,
    });
    function HomeStackScreen({navigation, route}) {
        return (
            <Stack.Navigator screenOptions={homePageContainer}>
                <Stack.Group screenOptions={{animation: 'none'}}>
                    <Stack.Screen name={routes.Home} component={Home}/>
                    {/*<Stack.Screen name={routes.Search} component={Search}/>*/}
                    {/*<Stack.Screen name={routes.Explore} component={Explore}/>*/}
                    {/*<Stack.Screen name={routes.Message} component={Message}/>*/}
                    {/*<Stack.Screen name={routes.Profile} component={Profile}/>*/}
                </Stack.Group>


                {/*<Stack.Group screenOptions={{headerShown: false, animation: 'fade'}}>*/}
                {/*    <Stack.Screen name={routes.ModalScreen} component={ModalScreen} options={{presentation: 'fullScreenModal'}} initialParams={{tabBarVal: 0}}/>*/}
                {/*</Stack.Group>*/}

            </Stack.Navigator>


        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme === 'light' ? 'white' : 'black'}}>
            <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={theme === 'light' ? '#f3f3f3' : '#303030'}
            />
            <NavigationContainer ref={navigationRef}>
                <Tab.Navigator tabBar={props => <TabBar {...props} />}
                               screenOptions={homePageContainer}>
                    <Tab.Screen name={routes.Home} component={Home}/>
                    <Tab.Screen name={routes.Search} component={Search}/>
                    <Tab.Screen name={routes.Explore} component={Explore}/>
                    <Tab.Screen name={routes.Message} component={Message}/>
                    <Tab.Screen name={routes.Profile} component={Profile}/>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )

}

export default AppNavigator;
