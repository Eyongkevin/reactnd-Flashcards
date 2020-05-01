import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { handleInitialData, clearInitialDecks } from '../actions';
import Deck from './Deck';
import { removeDecks } from '../utils/api'
import { blue } from '../utils/colors'


class DeckList extends Component{
    componentDidMount (){
        const { dispatch } = this.props
        dispatch(handleInitialData())
    };
    clear = () => {
        this.props.dispatch(clearInitialDecks())
        removeDecks()
        this.props.dispatch(handleInitialData())
      };
    render(){
        const { decks, isDummyData, navigation } = this.props;
        return(
            <ScrollView style={styles.container}>
                {decks && Object.keys(decks).map((key) =>{
                    const {title, questions } = decks[key]
                    return (<TouchableOpacity 
                            key={key}
                            onPress={() => navigation.navigate(
                                "DeckView",
                                {title: key}
                            )}>
                        <Deck 
                            title={title}
                            count={questions.length} />
                    </TouchableOpacity>)
                })}
                
                {!isDummyData
                ? (
                    <TouchableOpacity onPress={this.clear}>
                        <Text style={styles.resetTxt}>RESET</Text>
                    </TouchableOpacity>
                    )
                : null
                }
            </ScrollView>
        );
    };
};

const styles = StyleSheet.create({
    container:{
        alignSelf: 'stretch',
        padding: 10
    },
    resetTxt: {
        color: blue,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 30,
        fontWeight: '300',
    }
});

function mapStateToProps ({decks}){
    return{
        decks,
        isDummyData: decks && Object.keys(decks).length === 3,
    };
};


export default connect(mapStateToProps)(DeckList);