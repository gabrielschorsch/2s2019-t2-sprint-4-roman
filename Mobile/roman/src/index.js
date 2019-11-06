import SignInScreen from './pages/signin'
import Main from './pages/listagem'
import CadastrarTemas from './pages/cadastrarTemas'
import CadastrarProjetos from './pages/cadastrarProjetos'
import User from './pages/user'
import { AsyncStorage } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


const AuthStack = createStackNavigator({
    Sign: { screen: SignInScreen }
})

const MainNavigator = createBottomTabNavigator(
    {
        Main: {
            screen: Main
        },
        User: {
            screen: User
        },
        Projetos: {
            screen: CadastrarProjetos
        },
        Temas: {
            screen: CadastrarTemas
        }

    },
    {
        tabBarOptions: {
            activeBackgroundColor: 'rgb(40, 48, 156)',
            inactiveBackgroundColor: 'rgb(29, 35, 115)',
            activeTintColor: '#ddd',
            inactiveTintColor: '#eee',
            showLabel: true,
            labelStyle: {
                fontSize: 20,
            },
            style: {
                width: '100%',
                height: 50
            }
        },
    }

);

// const isLoginValid = async () => {
//     let jwtDecode = require('jwt-decode')
//     let token = await AsyncStorage.getItem('@roman:token');
//     let decoded = jwtDecode(token);
//     if (decoded !== null && decoded.exp * 1000 <= Date.now()) {
//         return true
//     } else {
//         return false
//     }

// }

export default createAppContainer(
    createSwitchNavigator({
        MainNavigator, AuthStack
    }, {

        initialRouteName: 'AuthStack'
    })
);