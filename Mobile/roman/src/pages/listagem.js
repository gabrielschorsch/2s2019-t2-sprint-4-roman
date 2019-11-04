import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
// import Video from "react-native-video";


// import { Container } from './styles';

const styles = StyleSheet.create(
    {
        app: {
            backgroundColor: '#fafafa',
            height: '100%'
        },
        lista: {
            marginVertical: 10,
            marginHorizontal: 15,
        },
        listItem: {
            marginVertical: 15,
            backgroundColor: '#fcfcfc',
            borderColor: '#000',
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
            fontWeight: 'bold'
        },
        listSubtitle: {
            fontSize: 15,
            fontWeight: 'bold'
        },
        listValue: {
            fontSize: 15
        },
        backgroundVideo: {
            height: '100%',
            position: 'absolute',
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
            alignItems: "stretch",

        }
    }
)


export default class Listagem extends Component {


    constructor() {
        super();
        this.state = {
            lista: []
        }
    }

    componentDidMount() {
        this._recuperarProjetos();
    }

    _recuperarProjetos = async () => {
        
        await fetch('http://192.168.4.221:5000/api/projetos', {
            headers: { 'Authorization': 'Bearer ' + AsyncStorage.getItem('@roman:token') }
        })
            .then(x => x.json())
            .then(x => this.setState({ lista: x }))
            .catch(err => console.warn(err))

    }

    render() {
        return (
            <View style={styles.app}>
                {/* <Video
                    source={require("./../assets/videos/milos.mp4")}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    /> */}
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
            </View>
        );
    }
}

