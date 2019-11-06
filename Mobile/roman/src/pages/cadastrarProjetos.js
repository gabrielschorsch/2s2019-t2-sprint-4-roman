import React, { Component } from 'react';

import { View, TextInput, Picker, Text, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    app: {
        backgroundColor: '#333333',
        height: '100%',
        justifyContent: 'center'
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
        marginTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    label:{
        color:'#fff',
        alignSelf:'center',
        marginTop:15,
    },
    picker:{
        width:'80%',
        alignSelf:'center',
        tintColor:'#fff',
        color:'#fff'
    }
})

const mockupItem = [
    {
        idTema:1,
        nome:'Tema'
    }
] 


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
            <View style={styles.app}>
                <TextInput placeholderTextColor='#fff' style={styles.input} placeholder='Nome do projeto' onChangeText={x => this.setState({ nome: x })} />
                <Text style={styles.label}> Tema:</Text>
                <Picker style={styles.picker} onValueChange={x => this.setState({ idTema: x })}>
                    {/* {this.state.temas.map(x => {
                        return (
                            <Picker.Item label={x.nome} value={x.idTema} />
                        )
                    }
                    )} */}
                    {mockupItem.map(x => {
                        return (
                            <Picker.Item label={x.nome} value={x.idTema} />
                        )
                    }
                    )}
                </Picker>
                <TouchableOpacity onPress={this._cadastrarProjeto}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
                <Text>{this.state.status}</Text>

            </View>
        );
    }
}
