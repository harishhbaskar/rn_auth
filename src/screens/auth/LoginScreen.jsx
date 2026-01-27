import React, { useState ,useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from "react-native"
import { globalStyles, Colors } from "../../styles/globalStyles"
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AuthFooter from "../../components/AuthFooter";
import { MailIcon, LockIcon, ArrowLeftIcon } from "../../components/Icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { API_URL } from '@env';



const LoginScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSavedEmail = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('savedEmail');
                if (savedEmail) {
                    setEmail(savedEmail);
                    setIsChecked(true);
                }
            } catch (error) {
                console.error("Error loading saved email:", error);
            }
        };
        loadSavedEmail();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/user/log-in/`, {
                method: "email",
                action: "generate",
                email: email,
                password: password
            });

            console.log(response.data)
            const token = response.data.token || response.data?.data?.tokens?.access;

            if (token) {
                await AsyncStorage.setItem('userToken', token);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                });
            } else {
                console.log("Full Error Object:", error); // View this in your terminal
                console.log("Server Response Data:", error.response?.data);
                Alert.alert("Error", error.response?.data?.message || "Something went wrong");
            }
        } catch (err) {
            console.log("Login Error Details:", err.response?.data || err.message);
            Alert.alert(
                "Error",
                err.response?.data?.message || "Check your internet connection"
            );
        } finally {
            setLoading(false);
        }
    };


    const renderHeader = () => {
        return (
            <View style={globalStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('CarouselTest')}>
                <Text style={{ color: Colors.primary }}>TEST CAROUSEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DataGrid')}>
                <Text style={{ color: Colors.primary }}>TEST GRID</Text>
            </TouchableOpacity> */}
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

                    <CustomButton 
                        title={loading ? "Logging in..." : "Login"} 
                        onPress={handleLogin} 
                        disabled={loading}
                    />

                </View>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <AuthFooter
                message="Dont have an account?"
                actionText="Sign Up here"
                onActionPress={() => navigation.navigate('Signup')}
            />
        )
    }
    return (
        <SafeAreaView style={globalStyles.safeArea} edges={["top", "left", "right"]}>
            <ScrollView
                contentContainerStyle={globalStyles.container}
                keyboardShouldPersistTaps="handled"
            >
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



