import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (username === 'User' && password === '1234') {
            onLogin();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Login</Text>
            <TextInput
                style={styles.textFields}
                placeholder='Username'
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.textFields}
                placeholder='Password'
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button onPress={handleLogin} title='Login'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loginText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    textFields: { width: '80%', padding: 10, borderWidth: 1, marginBottom: 10 }
});

export default LoginScreen;
