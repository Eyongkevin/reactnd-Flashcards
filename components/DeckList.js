import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions';
import Deck from './Deck';



class DeckList extends Component{
    componentDidMount (){
        const { dispatch } = this.props
        dispatch(handleInitialData())
    };
    render(){
        const { decks, navigation } = this.props;
        return(
            <ScrollView contentContainerStyle={styles.container}>
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
                            count={questions? questions.length: 0} />
                    </TouchableOpacity>)
                })}
            </ScrollView>
        );
    };
};

const styles = StyleSheet.create({
    container:{
        alignSelf: 'stretch',
        padding: 10
    }
});

function mapStateToProps ({decks}){
    return{
        decks,
    };
};


export default connect(mapStateToProps)(DeckList);