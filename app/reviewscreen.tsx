import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const reviewScreen = ({ book }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.bookTitle}>Book: {book.title}</Text>


            <View style={styles.inputContainer}>
                <Text style={styles.label}>Your Review</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={6}
                    placeholder="Write your review here..."
                />
            </View>


            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    textArea: {
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top', // Ensures the text starts from the top of the text area
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default reviewScreen;