import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from '@expo/vector-icons';

import Home from "../screens/Main/Home";
import Ticket from "../screens/Main/Ticket";
import Movies from "../screens/Main/Movies";
import Profile from "../screens/Main/Profile";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator tabBarPosition="bottom"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } if (route.name === 'Ticket') {
                        iconName = focused ? 'ticket' : 'ticket-outline';
                    } else if (route.name === 'Movie') {
                        iconName = focused ? 'film' : 'film-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={20} color={color} />;

                },
                tabBarActiveTintColor: '#eabf13',
                tabBarInactiveTintColor: '#ccccde',
                

                tabBarIndicatorStyle: {
                    height: 0, 
                },
                tabBarStyle: {
                    backgroundColor: '#1C1C1E'
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                },
                
                







            })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Ticket" component={Ticket} />
            <Tab.Screen name="Movie" component={Movies} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}