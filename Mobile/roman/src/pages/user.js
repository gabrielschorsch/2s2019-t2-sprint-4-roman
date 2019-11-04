import React, { Component } from 'react';

import { View, Image, Text, StyleSheet, AsyncStorage } from 'react-native';

// import { Container } from './styles';

const mockedUser =
{
    nome: 'Nomeeeeeeee',
    email: 'email@email.com',
    senha: '123',
    imagem: 'https://img.icons8.com/plasticine/2x/user.png'
}


const styles = StyleSheet.create({
    imagem: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: '#000',
        borderWidth: 1,
        marginHorizontal: 12,
        marginVertical: 10,
    },

    username: {
        fontSize: 15,
        marginLeft: 15,
        marginVertical: 5,
    },
    userDetails: {
        marginVertical: '7.5%',
        marginHorizontal: '25%',
    }
})


export default class pages extends Component {

    constructor() {
        super();
        this.state = {
            user: []
        }
    }


    componentDidMount() {
        this._recuperarUserToken();
    }


    _recuperarUserToken = async () => {
        let jwtDecode = require('jwt-decode')
        let token = await AsyncStorage.getItem('@roman:token');
        let decoded = jwtDecode(token);
        console.warn(decoded)
        if (decoded !== null) {
            this.setState({ user: decoded })
        } else {
            console.warn('tá nulo')
        }
    }


    render() {
        return (
            <View style={styles.userDetails}>
                <Image source={{ uri: this.state.user.Imagem }} style={styles.imagem} />
                <Text style={styles.username}>{this.state.user.Nome}</Text>
                <Text style={styles.username}>{this.state.user.email}</Text>
            </View>
        );
    }
}
