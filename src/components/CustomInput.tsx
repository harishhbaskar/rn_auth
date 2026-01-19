import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeOffIcon } from './Icons';
interface CustomInputProps {
  icon: React.ReactNode;       
  placeholder : string;    
  isPassword : boolean;
  value : string;
  setValue : (text: string) => void;
}

const CustomInput = ({ icon, placeholder, isPassword ,value , setValue}:CustomInputProps) => {
  
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.iconPlaceholder}>{icon}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureText}
        value={value}
        onChangeText={setValue}
      />

      
      {isPassword && (
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
});

export default CustomInput;