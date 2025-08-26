import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Using Open Library API for book data
const API_URL = 'https://openlibrary.org/search.json?title=';

const HomeScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [reviews, setReviews] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('best sellers');

    // Fetch books from API
    const fetchBooks = async (query = 'best sellers') => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}${encodeURIComponent(query)}&limit=10`);
            const data = await response.json();

            if (data.docs && data.docs.length > 0) {
                const formattedBooks = data.docs.slice(0, 5).map((book, index) => ({
                    id: book.key || `book-${index}`,
                    title: book.title || 'Unknown Title',
                    author: book.author_name ? book.author_name[0] : 'Unknown Author',
                    // Using placeholder images since Open Library doesn't always provide cover images
                    image: book.cover_i
                        ? { uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` }
                        : require('../assets/placeholder.jpeg'),
                    publishedYear: book.first_publish_year || 'N/A'
                }));
                setBooks(formattedBooks);
            } else {
                // Fallback data if API doesn't return results
                setBooks(fallbackBooks);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            Alert.alert('Error', 'Failed to fetch books. Using sample data.');
            setBooks(fallbackBooks);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleReviewSubmit = (bookId) => {
        if (reviews[bookId] && reviews[bookId].trim()) {
            Alert.alert('Success', 'Your review has been submitted!');
            // Here you would typically send the review to your backend
        } else {
            Alert.alert('Error', 'Please write a review before submitting.');
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchBooks(searchQuery);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Loading Books...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Book Reviews</Text>
                    <Ionicons name="library-outline" size={28} color="#6200ee" />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for books..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Ionicons name="search" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Featured Books</Text>

                {books.map((item) => (
                    <View key={item.id} style={styles.bookCard}>
                        <View style={styles.bookHeader}>
                            <Image
                                source={item.image}
                                style={styles.bookImage}
                                defaultSource={require('../assets/placeholder.jpeg')}
                            />
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookTitle}>{item.title}</Text>
                                <Text style={styles.bookAuthor}>by {item.author}</Text>
                                <Text style={styles.bookYear}>Published: {item.publishedYear}</Text>
                            </View>
                        </View>

                        <Text style={styles.reviewPrompt}>Share your review on this book</Text>
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Write your review here..."
                            multiline
                            numberOfLines={4}
                            value={reviews[item.id] || ''}
                            onChangeText={(text) => setReviews({...reviews, [item.id]: text})}
                        />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => handleReviewSubmit(item.id)}
                        >
                            <Text style={styles.submitButtonText}>Submit Review</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => fetchBooks()}
                >
                    <Text style={styles.moreButtonText}>Load More Books</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

// Fallback data in case API fails
const fallbackBooks = [
    {
        id: '1',
        title: 'Indraneela Manikkya',
        author: 'Chandana Mendis',
        image: require('../assets/placeholder.jpeg'),
        publishedYear: 2015
    },
    {
        id: '2',
        title: 'Bihisunu Nimnaya',
        author: 'Chandana Mendis',
        image: require('../assets/placeholder.jpeg'),
        publishedYear: 2018
    },
    {
        id: '3',
        title: 'Pudgalikai Rahasigathai',
        author: 'Chandana Mendis',
        image: require('../assets/placeholder.jpeg'),
        publishedYear: 2020
    },
    {
        id: '4',
        title: 'Apuru Iskole Apuru Dawas',
        author: 'Sudath Rohan',
        image: require('../assets/placeholder.jpeg'),
        publishedYear: 2017
    },
    {
        id: '5',
        title: 'Hari Apuru Iskole',
        author: 'Sudath Rohan',
        image: require('../assets/placeholder.jpeg'),
        publishedYear: 2019
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 30,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6200ee',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#2979ff',
        borderRadius: 10,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    bookCard: {
        backgroundColor: '#ede7f6',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookHeader: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    bookImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 15,
    },
    bookInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    bookYear: {
        fontSize: 12,
        color: '#888',
    },
    reviewPrompt: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#444',
    },
    reviewInput: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#7c4dff',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    moreButton: {
        backgroundColor: 'skyblue',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    moreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
});

export default HomeScreen;