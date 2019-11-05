import React, { Component } from 'react';

import { View, TextInput, Picker, Text, TouchableOpacity, AsyncStorage } from 'react-native';

export default class cadastrarProjetos extends Component {


    constructor() {
        super();
        this.state = {
            temas: [],
            nome: null,
            idTema: null,
            status: null
        }
    }

    componentDidMount() {
        this.setState({ status: null });
        this._recuperarTemas();
    }

    _recuperarTemas = async () => {
        let token = await AsyncStorage.getItem('@roman:token');
        await fetch('http://192.168.3.201:5000/api/temas', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(x => x.json())
            .then(x => this.setState({ temas: x }))
    }


    _cadastrarProjeto = async () => {
        let token = await AsyncStorage.getItem('@roman:token');
        await fetch('http://192.168.3.201:5000/api/projetos', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
                idTema: this.state.idTema
            })
        })
            .then(this.setState({ status: 'Cadastro realizado com sucesso' }))
            .catch(error => this.setState({ status: 'Erro ao cadastrar, ' + error }))

    }



    render() {
        return (
            <View>
                <TextInput placeholder='Nome do projeto' onChangeText={x => this.setState({ nome: x })} />
                <Text> Tema:</Text>
                <Picker onValueChange={x => this.setState({ idTema: x })}>
                    {this.state.temas.map(x => {
                        return (
                            <Picker.Item label={x.nome} value={x.idTema} />
                        )
                    }
                    )}
                </Picker>
                <TouchableOpacity onPress={this._cadastrarProjeto}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <Text>{this.state.status}</Text>

            </View>
        );
    }
}
