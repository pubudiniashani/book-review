import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

const books = [
    {
        id: '1',
        title: 'Sherlock Holmes',
        author: 'James Clear',
        image: require('../assets/image 1.jpg'),

    },
    {
        id: '2',
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        image: require('../assets/image 2.jpg'),

    },
    {
        id: '2',
        title: 'The Power of Now',
        author: 'Eckhart Tolle',

    },
    {
        id: '2',
        title: 'The Power of Now',
        author: 'Eckhart Tolle',

    },

];

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            {books.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('BookDetails', { book: item })}
                    style={{
                        marginVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 10,
                    }}
                >
                    <Image source={item.image} style={{ width: 100, height: 150, borderRadius: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.author}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HomeScreen;
