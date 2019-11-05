import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, AsyncStorage, ScrollView } from 'react-native';



// import { Container } from './styles';

const styles = StyleSheet.create(
    {
        app: {
            backgroundColor: '#333333',
            height: '100%'
        },
        lista: {
            marginVertical: 10,
            marginHorizontal: 15,
        },
        listItem: {
            marginVertical: 15,
            backgroundColor: '#6b6b6b',
            borderColor: '#fff',
            borderRadius: 15.5,
            borderWidth: 1
        },
        listRow: {
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 10,
        },
        listTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color:'#fff'
        },
        listSubtitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color:'#fff'
        },
        listValue: {
            fontSize: 15,
            color:'lightgrey'
        },
        
    }
)


export default class Listagem extends Component {


    constructor() {
        super();
        this.state = {
            lista: [],
        }
    }

    componentDidMount() {
        this._recuperarProjetos();
    }

    _recuperarProjetos = async () => {
        let token = await AsyncStorage.getItem('@roman:token');
        await fetch('http://192.168.3.201:5000/api/projetos', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(x => x.json())
            .then(x => this.setState({ lista: x }))
            .catch(err => console.warn(err))
    }


    render() {
        return (
            <View style={styles.app}>

                
                <ScrollView>

                    <FlatList
                        data={this.state.lista}
                        keyExtractor={key => key.idProjeto}
                        style={styles.lista}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View style={styles.listRow}>
                                    <Text style={styles.listTitle}>Nome:</Text>
                                    <Text style={styles.listValue}>{item.nome}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.listSubtitle}>Tema:</Text>
                                    <Text style={styles.listValue}>{item.idTemaNavigation.nome}</Text>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        );
    }
}

