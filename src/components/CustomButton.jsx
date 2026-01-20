import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';



const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#2D8C5F', 
    borderRadius: 50,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
});

export default CustomButton;