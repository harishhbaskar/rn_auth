import React , {useState}from "react"
import {View , Text  , StyleSheet , TextInput ,Pressable ,TouchableOpacity,ScrollView} from "react-native"



const LoginScreen = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [secureText, setSecureText] = useState(true);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                 <Text style={styles.backArrow}>{"<"}</Text> 
            </View>

            <Text style = {styles.label}>Log in</Text>
            <Text style = {styles.subtitle}>Enter your email and password to securely access your account and manage your services</Text>
            <View style = {styles.form}>
                {/* inputs*/}
                <View style={styles.inputContainer}>
                    <Text style={styles.iconPlaceholder}>✉️</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.iconPlaceholder}>🔒</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry={secureText}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Text style={styles.eyeIcon}>{secureText ? "👁️" : "🚫"}</Text>
                    </TouchableOpacity>
                </View>
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

                 <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signupRow}>
                    <Text style={styles.text}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signupText}>Sign Up here</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                <Text style={[styles.text , {textAlign : 'center'},{marginBottom : 20}]}>Or create an account with</Text>
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}><Text>f</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}><Text>G</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}><Text></Text></TouchableOpacity>
                </View>

            </View>

        </ScrollView>     
    )

    }

const styles = StyleSheet.create({
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
    
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50, 
        borderWidth: 1,
        borderColor: '#E5E7EB',
        height: 56,
        paddingHorizontal: 16,
        marginBottom: 16,
        elevation: 1,
    },
    iconPlaceholder: {
        fontSize: 18,
        marginRight: 10,
    },
    input: {
        flex: 1, 
        height: '100%',
        color: '#333',
    },
    eyeIcon: {
        fontSize: 18,
        padding: 4,
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
    loginButton: {
        backgroundColor: '#2D8C5F', 
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#2D8C5F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    text: {
        color: '#6B7280',
    },
    signupText: {
        color: '#2D8C5F',
        fontWeight: 'bold',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    divider: {
      height: 1,
      backgroundColor: '#ddd',
      width: '100%',
      marginBottom:20,
    }

});



export default LoginScreen;



