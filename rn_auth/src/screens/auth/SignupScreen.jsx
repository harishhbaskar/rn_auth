import React , {useState}from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import {View , Text ,TouchableOpacity,ScrollView } from "react-native"
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AuthFooter from "../../components/AuthFooter";
import { UserIcon, MailIcon, LockIcon, ArrowLeftIcon } from "../../components/Icons";
import { globalStyles } from "../../styles/globalStyles";




const SignupScreen = ({navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Welcome', { email: email });
    };

    const renderHeader = () => {
        return(
            <View style={globalStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon />
                </TouchableOpacity>
            </View>
        )
    }

    const renderContent = () => {
        return(
            <View >
            <Text style = {globalStyles.title}>Create Account</Text>
            <Text style = {globalStyles.subtitle}>Create a new acccount to get started and enjoy seamless access to our features</Text>
            <View style = {globalStyles.form}>
                {/* inputs*/}
                <CustomInput icon={<UserIcon />} placeholder="Name" isPassword={false} value={name} setValue={setName}/>
                <CustomInput icon={<MailIcon />} placeholder="Email Address" isPassword={false} value = {email} setValue={setEmail}/>
                <CustomInput icon={<LockIcon/>} placeholder="Password" isPassword={true} value={password} setValue={setPassword}/>
                <CustomInput icon={<LockIcon/>} placeholder="Confirm Password" isPassword={true} value={confirmPassword} setValue={setConfirmPassword}/>

                <CustomButton title="Create Account" onPress={handleLogin} />

            </View>
            </View>
        )
    }

    const renderFooter = () => {
        return(
            <AuthFooter
                    message="Already have an account ?"
                    actionText="Sign in here"
                    onActionPress={() => navigation.navigate("Login")}
            />
        )
    }

    return (
        <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.container}>
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
        </ScrollView>  
        </SafeAreaView>   
    )
    }



export default SignupScreen;



