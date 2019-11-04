import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

// import { Container } from './styles';

export default class pages extends Component {

    constructor() {
        super();
        this.state = {
            email: 'admin@admin.com',
            senha: '123456'
        };
    }

    _irParaHome = async (token) => {
        if (token !== null) {
            try {
                await AsyncStorage.setItem('@roman:token', token);
                this.props.navigation.navigate('MainNavigator');
            } catch (error) {

            }
        }
    }



    _realizarLogin = async () => {
        // console.warn(this.state.email + this.state.senha)
        await fetch('http://192.168.4.221:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha,
            })
        })
            .then(response => response.json())
            //sharedpreference
            .then(data => this._irParaHome(data.token))
            .catch(error => console.warn(error))
    }

    render() {

        return (
            <View>
                <TextInput placeholder='Email' onChangeText={(email => this.setState({ email: email }))} />
                <TextInput secureTextEntry={true} placeholder='Senha' onChangeText={(senha => this.setState({ senha: senha }))} />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

