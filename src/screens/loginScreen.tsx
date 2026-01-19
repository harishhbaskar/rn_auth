import React , {useState}from "react"
import {View , Text  , StyleSheet , TextInput ,Pressable ,TouchableOpacity,ScrollView} from "react-native"
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import AuthFooter from "../components/AuthFooter";


const LoginScreen = ({navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Welcome', { email: email });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.header, {marginBottom : 60}]}>
                 <Text style={styles.backArrow}>{"<"}</Text> 
            </View>

            <Text style = {styles.label}>Log in</Text>
            <Text style = {styles.subtitle}>Enter your email and password to securely access your account and manage your services</Text>
            <View style = {styles.form}>
                {/* inputs*/}
                <CustomInput icon="✉️" placeholder="Email Address" isPassword={false} value={email} setValue={setEmail} />
                <CustomInput icon="🔒" placeholder="Password" isPassword={true} value={password} setValue={setPassword}/>

                {/*checkbox*/}
                <View style={styles.row}>
                    <Pressable 
                        style={styles.rememberMe}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]} />
                        <Text style={styles.rememberText}>Remember me</Text>
                    </Pressable>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <CustomButton title="Login" onPress={handleLogin} />

                <AuthFooter 
                    message="Dont have an account?"
                    actionText="Sign Up here"
                    onActionPress={() => navigation.navigate('Signup')}
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
    backArrow: {
        fontSize: 24,
        color: '#333',
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
    
    
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#2D8C5F', 
        borderColor: '#2D8C5F',
    },
    rememberText: {
        color: '#374151',
        fontSize: 14,
    },
    forgot: {
        fontWeight: '600',
        color: '#111',
        fontSize: 14,
    },
    
});



export default LoginScreen;



