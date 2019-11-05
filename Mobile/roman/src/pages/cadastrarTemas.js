import React, { Component } from 'react';

import { View, TextInput, Picker, Text, TouchableOpacity, AsyncStorage } from 'react-native';

export default class cadastrarProjetos extends Component {


    constructor() {
        super();
        this.state = {
            temas: [],
            nome: null,
            status: null
        }
    }

    componentDidMount() {
        this.setState({ status: null });
    }

    _cadastrarProjeto = async () => {
        let token = await AsyncStorage.getItem('@roman:token');
        await fetch('http://192.168.3.201:5000/api/temas', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
            })
        })
            .then(this.setState({ status: 'Cadastro realizado com sucesso' }))
            .catch(error => this.setState({ status: 'Erro ao cadastrar, ' + error }))

    }

    render() {
        return (
            <View>
                <TextInput placeholder='Nome do tema' onChangeText={x => this.setState({ nome: x })} />
                <TouchableOpacity onPress={this._cadastrarProjeto}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <Text>{this.state.status}</Text>

            </View>
        );
    }
}
