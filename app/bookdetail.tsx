import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, ScrollView } from 'react-native';

const BookDetailScreen = ({ route }) => {
    const { book } = route.params; // Getting the book data from route params
    const [review, setReview] = useState('');

    function handleSubmitReview() {
        // Logic for submitting the review (e.g., save to state or server)
        console.log('Review submitted:', review);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image source={book.image} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{book.title}</Text>

                <Text style={styles.label}>Share your review</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Write your review here..."
                    multiline
                    numberOfLines={6}
                    value={review}
                    onChangeText={setReview}
                />

                <Button title="Submit Review" onPress={handleSubmitReview} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    card: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    bookImage: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    textArea: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});

export default BookDetailScreen;
