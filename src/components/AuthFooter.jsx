import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';

const AuthFooter = ({ message, actionText, onActionPress }) => {
  return (
    <View style={styles.container}>
      {/* 1. Switch Account Link */}
      <View style={styles.switchRow}>
        <Text style={styles.text}>{message} </Text>
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.switchText}>{actionText}</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Divider */}
      <View style={styles.divider} />

      {/* 3. Social Section */}
      <Text style={styles.orText}>Or Continue With Account</Text>
      
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
           <Text style={styles.socialIcon}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
           <Text style={styles.socialIcon}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
           <Text style={styles.socialIcon}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  switchText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    width: '100%',
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: 20,
    fontSize: 12,
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    // Slight shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  }
});

export default AuthFooter;