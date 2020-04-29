import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { purple, lightPurp, gray, white} from '../utils/colors';

const CustomBtn = ({ onPress, disabled, text }) => {
    return(
        <TouchableOpacity 
            style={[Platform.OS === 'ios'
            ? styles.iosbtnDark
            : styles.androidbtnDark, 
            disabled
            ? styles.disabled
            : null]}
            onPress={onPress}
            disabled = {disabled}>
            <Text style={[styles.btnTextLight, disabled? {color:gray}:{color:white} ]}>
                {text}
            </Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnTextLight: {
        fontWeight: '500',
      },
    iosbtnDark: {
        backgroundColor: purple,
        borderRadius: 5,
        height: 40,
        width: 150,
        padding: 10,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    androidbtnDark: {
        backgroundColor: purple,
        borderRadius: 5,
        height: 40,
        width: 150,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    disabled: {
        backgroundColor:lightPurp, 
    },
});

export default CustomBtn;