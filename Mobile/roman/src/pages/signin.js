import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, StatusBar } from 'react-native';

import Video from 'react-native-video'

const styles = StyleSheet.create({
    app: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    backgroundVid: {
        height: '100%',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        alignItems: "stretch",
    },
    input: {
        alignSelf: 'center',
        marginTop: 5,
        borderColor: '#fff',
        borderBottomWidth: 1,
        width: 300,
        color: '#fff'

    },
    button: {
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 15,
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
})



export default class pages extends Component {
    static navigationOptions = {
        header: null,
    }

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
        await fetch('http://192.168.3.201:5000/api/usuarios', {
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
            <View style={styles.app}>
                <StatusBar
                    hidden
                    barStyle="dark-content"
                />

                <Video
                    source={require('./../assets/vids/loop_vid.mp4')}
                    muted={true}
                    style={styles.backgroundVid}
                    resizeMode={'cover'}
                />
                <TextInput placeholderTextColor='#fff' placeholder='Email' onChangeText={(email => this.setState({ email: email }))} style={styles.input} />
                <TextInput placeholderTextColor='#fff' secureTextEntry={true} placeholder='Senha' onChangeText={(senha => this.setState({ senha: senha }))} style={styles.input} />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

