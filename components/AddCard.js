import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    KeyboardAvoidingView,
    TextInput} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import RadioForm from 'react-native-simple-radio-button';

import { addCard } from '../actions'
import { purple, white, gray,red, orange } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import CustomBtn from './CustomBtn'



const answer_option = [
    {label: 'False', value: 0},
    {label: 'True', value: 1}
]

class AddCard extends Component{
    state = {
        front:'',
        back: '',
        answerOption: null,
    }
    setTitle = (cardTitle) =>{
        this.props.navigation.setOptions({
            title: cardTitle+' Add Card'
        })
    }
    handleOnchange = (input, flag) =>{
        if(flag === 'front'){
            this.setState({
                front: input
            })
        }else if(flag === 'back'){
            this.setState({
                back: input
            })
        }else if (flag === 'radio'){
            this.setState({
                answerOption: input.id
            })
            
        }

    } 
    handleSubmit = () =>{
        const { dispatch, route, navigation } = this.props
        const { front, back, answerOption } = this.state
        const { deckId } = route.params
        
        const card = {
            question: front,
            answer: back,
            correctAns: answerOption ? 'true': 'false'
        }

        // Update redux
        dispatch(addCard(card, deckId))

        // save to AsyncStorage
        addCardToDeck(card, deckId)

        // Navigate to DeckView
        navigation.navigate(
            "DeckView",
            {title: deckId}
            )
        
    }
    render () {
        const { front, back, answerOption } = this.state
        const { title } = this.props
        const disabled = front.length === 0 || back.length === 0 || answerOption === null
        this.setTitle(title)

        return (
            <View style={{flex: 1, backgroundColor: orange}} >
          <KeyboardAvoidingView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Front</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40}}>
              <TextInput
                style={styles.input}
                value={front}
                onChangeText={(input) => this.handleOnchange(input, 'front')}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Back</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40}}>
              <TextInput
                style={styles.input}
                value={back}
                onChangeText={(input) => this.handleOnchange(input, 'back')}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.labelans}>Is this true or false?</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40}}>
                <RadioForm
                    radio_props={answer_option}
                    initial={-1}
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor= { white }
                    labelStyle={{color: purple}}
                    animation={true}
                    onPress={(value) => this.handleOnchange(value, 'radio')} />
            </View>
            <CustomBtn 
                onPress={this.handleSubmit}
                disabled= {disabled? true: false} 
                text="Submit"/>
          {disabled
                ? (
                    <View style={{flexDirection:'row', flexWrap:'wrap', margin:3, padding:5}}>
                        <FontAwesome name='warning' size={15} color={red} />
                        <Text style={{color:red}}>
                        Please fill all fields
                        </Text>
                    </View>
                )
                : null
                }
          </KeyboardAvoidingView>
         
          
                </View>
          
        )
      }
}

const styles = StyleSheet.create({
    container: {
     
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    label: {
      flex: 0.8,
      fontSize: 20,
      fontWeight: '500',
      color: purple,
      marginTop: 40,
      marginBottom: 10,
      alignItems: 'flex-start'
    },
    labelans:{
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: purple,
        marginTop: 8,
        marginBottom:10
    },
    input: {
        flex: 0.8,
      alignItems: 'center',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: gray,
      paddingLeft: 5,
      backgroundColor: white,
    },
    
    
  })


function mapStateToProps(_, { route} ){
    const {deckId } = route.params
    return{
        title: deckId
    }
}
export default connect(mapStateToProps)(AddCard)