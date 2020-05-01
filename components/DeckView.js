import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { purple, white, orange, red } from '../utils/colors';
import CustomBtn from './CustomBtn';
import { getCardsLength } from '../utils/helper'

class DeckView extends Component{

    setTitle = (deckTitle) =>{
        this.props.navigation.setOptions({
            title: deckTitle + ' Deck'
        });
    };

    render(){
        const { questions, title, navigation } = this.props;
        this.setTitle(title);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{ title }</Text>    
                <Text style={styles.cardNumber}>{getCardsLength(questions.length)}</Text>
                <TouchableOpacity style={styles.btnLight} onPress={() => navigation.navigate(
                'AddCard',
                {deckId: title}
                )}>
                    <Text style={styles.btnTextDark}>Add Card</Text>
                </TouchableOpacity>
                <CustomBtn 
                    onPress={() => navigation.navigate(
                        'Quiz',
                        {deckId: title}
                        )}
                    disabled= {questions.length === 0? true: false} 
                    text="Start Quiz"/>

                {questions.length === 0
                ? (
                    <View style={{flexDirection:'row', flexWrap:'wrap', margin:3, padding:5}}>
                        <FontAwesome name='warning' size={15} color={red} />
                        <Text style={{color:red}}>Add card before you can start quiz</Text>
                    </View>
                )
                : null
                }
            </View>

        );
    };
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: purple,
      },
    cardNumber: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 20,
        color: purple
    },
    btnLight: {
        backgroundColor: white,
        borderRadius: 5,
        height: 40,
        width: 150,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    btnTextDark: {
        color: purple,
        fontWeight: '500',
    }
  });


function mapStateToProps({ decks }, { route} ){
    const { title } = route.params;
    return{
        title,
        questions : decks[title].questions
    };
};

export default connect(mapStateToProps)(DeckView);