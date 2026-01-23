import React , {useState}from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import {View , Text  , StyleSheet ,Pressable ,TouchableOpacity,ScrollView } from "react-native"
import {globalStyles , Colors} from "../../styles/globalStyles"
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AuthFooter from "../../components/AuthFooter";
import {MailIcon, LockIcon, ArrowLeftIcon } from "../../components/Icons";



const LoginScreen = ({navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
    });
    };

    const renderHeader = () => {
        return (
            <View style={globalStyles.header}>
                <TouchableOpacity>
                    <ArrowLeftIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CarouselTest')}>
                    <Text style={{ color: Colors.primary }}>TEST CAROUSEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DataGrid')}>
                    <Text style={{color:Colors.primary}}>TEST GRID</Text>
                </TouchableOpacity>
            </View>

        )

    }


    const renderContent = () => {
        return (
            <View>
                <Text style={globalStyles.title}>Log in</Text>
                <Text style={globalStyles.subtitle}>Enter your email and password to securely access your account and manage your services</Text>
                <View style={globalStyles.form}>
                    {/* inputs*/}
                    <CustomInput icon={<MailIcon />} placeholder="Email Address" isPassword={false} value={email} setValue={setEmail} />
                    <CustomInput icon={<LockIcon />} placeholder="Password" isPassword={true} value={password} setValue={setPassword} />

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

                </View>
            </View>
        )
    }

    const renderFooter = () => {
        return(
            <AuthFooter
                        message="Dont have an account?"
                        actionText="Sign Up here"
                        onActionPress={() => navigation.navigate('Signup')}
            />
        )
    }
    return (
        <SafeAreaView style={globalStyles.safeArea} edges={["top","left","right"]}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                {renderHeader()}
                {renderContent()}
                {renderFooter()}
            </ScrollView>     
        </SafeAreaView>
    )

    }

export const styles = StyleSheet.create({    
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
        borderColor: Colors.border,
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: Colors.white,
    },
    checkboxChecked: {
        backgroundColor: Colors.primary, 
        borderColor: Colors.primary,
    },
    rememberText: {
        color: '#374151',
        fontSize: 14,
    },
    forgot: {
        fontWeight: '600',
        color: Colors.textPrimary,
        fontSize: 14,
    },
    
});



export default LoginScreen;



