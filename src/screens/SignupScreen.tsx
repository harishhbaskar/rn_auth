import React , {useState}from "react"
import {View , Text  , StyleSheet , TextInput ,Pressable ,TouchableOpacity,ScrollView} from "react-native"
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import AuthFooter from "../components/AuthFooter";
import { UserIcon, MailIcon, LockIcon, ArrowLeftIcon } from "../components/Icons";


const SignupScreen = ({navigation }:any ) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Welcome', { email: email });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.header, {marginBottom : 60}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon />
                </TouchableOpacity>
            </View>

            <Text style = {styles.label}>Create Account</Text>
            <Text style = {styles.subtitle}>Create a new acccount to get started and enjoy seamless access to our features</Text>
            <View style = {styles.form}>
                {/* inputs*/}
                <CustomInput icon={<UserIcon />} placeholder="Name" isPassword={false} value={name} setValue={setName}/>
                <CustomInput icon={<MailIcon />} placeholder="Email Address" isPassword={false} value = {email} setValue={setEmail}/>
                <CustomInput icon={<LockIcon/>} placeholder="Password" isPassword={true} value={password} setValue={setPassword}/>
                <CustomInput icon={<LockIcon/>} placeholder="Confirm Password" isPassword={true} value={confirmPassword} setValue={setConfirmPassword}/>

               

                <CustomButton title="Create Account" onPress={handleLogin} />

                <AuthFooter
                    message="Already have an account ?"
                    actionText="Sign in here"
                    onActionPress={() => navigation.navigate("Login")}

                />

            </View>

        </ScrollView>     
    )

    }

export const styles = StyleSheet.create({
    container : {
            flexGrow : 1,
            padding: 24,
            backgroundColor: '#F9FAFB',
    },
    header: {
        marginBottom: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize:14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    label : {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 8,
        textAlign: 'center',

    },
    form: {
        width: '100%',
    },
    
    
    

});



export default SignupScreen;



