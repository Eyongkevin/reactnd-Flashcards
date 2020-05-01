import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'Flashcards:notifications';


export const getCardsLength = (count)=>{
    if (count === 0 || count > 1){
        return <Text>{count} cards</Text>
    }else{
        return <Text>1 card</Text>
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync);
  };
  
function createNotification () {
    return {
        title: 'Study by Flashcards!',
        body: "👋 do not forget to take a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    };
};

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);
            
                            Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                            );
            
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                })
        }
    })
}