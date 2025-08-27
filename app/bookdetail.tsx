import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
    ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type Book = {
    image: ImageSourcePropType;
    title: string;
    author: string;
    publishedYear: string;
};

type Review = {
    id: string;
    user: string;
    text: string;
    rating: number;
    date: string;
};

// Define your navigation param list
type RootStackParamList = {
    BookDetails: { book: Book; review: string };
};

type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;
type BookDetailsNavProp = StackNavigationProp<RootStackParamList, 'BookDetails'>;

const BookDetailsScreen: React.FC = () => {
    const route = useRoute<BookDetailsRouteProp>();
    const navigation = useNavigation<BookDetailsNavProp>();
    const { book, review: initialReview } = route.params;

    const [review, setReview] = useState<string>(initialReview);
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [activeTab, setActiveTab] = useState<'write' | 'read'>('write');

    // In a real app, you would fetch reviews from an API
    useEffect(() => {
        const mockReviews: Review[] = [
            { id: '1', user: 'BookLover123', text: 'This book changed my perspective on life!', rating: 5, date: '2023-10-15' },
            { id: '2', user: 'LiteraryFan', text: 'The character development was exceptional.', rating: 4, date: '2023-09-22' },
            { id: '3', user: 'ReadingEnthusiast', text: 'Could not put it down! Finished in one sitting.', rating: 5, date: '2023-11-05' },
        ];
        setAllReviews(mockReviews);
    }, []);

    const handleSubmitReview = () => {
        if (review.trim()) {
            Alert.alert('Success', 'Your review has been submitted!');
            const newReview: Review = {
                id: Date.now().toString(),
                user: 'You',
                text: review,
                rating: 5,
                date: new Date().toISOString().split('T')[0],
            };
            setAllReviews([newReview, ...allReviews]);
            setReview('');
            setActiveTab('read');
        } else {
            Alert.alert('Error', 'Please write a review before submitting.');
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? 'star' : 'star-outline'}
                    size={16}
                    color="#FFD700"
                />
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Book Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Book Info */}
                <View style={styles.bookInfoContainer}>
                    <Image
                        source={book.image}
                        style={styles.bookImageLarge}
                        defaultSource={require('../assets/placeholder.jpeg')}
                    />
                    <View style={styles.bookDetails}>
                        <Text style={styles.bookTitleLarge}>{book.title}</Text>
                        <Text style={styles.bookAuthor}>by {book.author}</Text>
                        <Text style={styles.bookYear}>Published: {book.publishedYear}</Text>
                    </View>
                </View>

                {/* Review Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'write' && styles.activeTab]}
                        onPress={() => setActiveTab('write')}
                    >
                        <Text style={[styles.tabText, activeTab === 'write' && styles.activeTabText]}>
                            Write Review
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'read' && styles.activeTab]}
                        onPress={() => setActiveTab('read')}
                    >
                        <Text style={[styles.tabText, activeTab === 'read' && styles.activeTabText]}>
                            Read Reviews ({allReviews.length})
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Write Review Tab */}
                {activeTab === 'write' && (
                    <View style={styles.writeReviewContainer}>
                        <Text style={styles.sectionTitle}>Your Review</Text>
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Share your thoughts about this book..."
                            multiline
                            numberOfLines={6}
                            value={review}
                            onChangeText={setReview}
                        />
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmitReview}
                        >
                            <Text style={styles.submitButtonText}>Submit Review</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Read Reviews Tab */}
                {activeTab === 'read' && (
                    <View style={styles.readReviewsContainer}>
                        <Text style={styles.sectionTitle}>
                            {allReviews.length} Review{allReviews.length !== 1 ? 's' : ''}
                        </Text>
                        {allReviews.length === 0 ? (
                            <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
                        ) : (
                            allReviews.map((r) => (
                                <View key={r.id} style={styles.reviewItem}>
                                    <View style={styles.reviewHeader}>
                                        <Text style={styles.reviewUser}>{r.user}</Text>
                                        {renderStars(r.rating)}
                                    </View>
                                    <Text style={styles.reviewDate}>{r.date}</Text>
                                    <Text style={styles.reviewText}>{r.text}</Text>
                                </View>
                            ))
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContainer: { padding: 16, paddingBottom: 30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    bookInfoContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    bookImageLarge: { width: 100, height: 150, borderRadius: 8, marginRight: 15 },
    bookDetails: { flex: 1, justifyContent: 'center' },
    bookTitleLarge: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    bookAuthor: { fontSize: 16, color: '#666', marginBottom: 5 },
    bookYear: { fontSize: 14, color: '#888' },
    tabContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' },
    tab: { flex: 1, padding: 15, alignItems: 'center' },
    activeTab: { backgroundColor: '#7c4dff' },
    tabText: { fontSize: 16, fontWeight: '600', color: '#666' },
    activeTabText: { color: '#fff' },
    writeReviewContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 },
    readReviewsContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    reviewInput: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#ddd', marginBottom: 15, minHeight: 120, textAlignVertical: 'top' },
    submitButton: { backgroundColor: '#7c4dff', borderRadius: 8, padding: 12, alignItems: 'center' },
    submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    noReviewsText: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginVertical: 20 },
    reviewItem: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 15 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    reviewUser: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    starsContainer: { flexDirection: 'row' },
    reviewDate: { fontSize: 12, color: '#888', marginBottom: 8 },
    reviewText: { fontSize: 14, color: '#444', lineHeight: 20 },
});

export default BookDetailsScreen;
