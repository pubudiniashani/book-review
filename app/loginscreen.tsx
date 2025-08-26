import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (username === 'User' && password === '1020WE') {
            onLogin();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Optional Logo */}
                <Image
                    source={require('../assets/book.jpeg')}
                    style={styles.logo}
                />
                <Text style={styles.loginText}>Welcome Back</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="#999"
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8eaf6',
    },
    card: {
        width: '85%',
        padding: 25,
        backgroundColor: '#bbdefb',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 15,
        backgroundColor: '#eee'
    },
    loginText: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 25,
        color: '#1a237e'
    },
    textInput: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        // borderColor: '#e3f2fd',
        borderColor: '#fff',
        borderRadius: 20,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#448aff',
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    signupText: {
        fontSize: 14,
        color: '#3f51b5'
    },
    signupLink: {
        color: '#3949ab',
        fontWeight: '600'
    }
});

export default LoginScreen;
