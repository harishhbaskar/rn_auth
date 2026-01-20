import React from "react"
import {View , Text , StyleSheet} from "react-native"
import CustomButton from '../components/CustomButton'; 


const WelcomeScreen = ({route , navigation}) => {

    const {email} = route.params || {}

    return (
        <View style={styles.container}>
            <Text style = {styles.text}>You are logged in as {email}</Text>
            <View style={{ width: '70%', marginTop: 50 }}>
                <CustomButton
                    title="Log Out"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>

        
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // vertical
        alignItems: 'center',     // horizontal
    },
    text:{
        textAlign : 'center',
        fontSize:20,
        fontWeight : 'bold'
        
    }
})

export default WelcomeScreen