import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

const books = [
    {
        id: '1',
        title: 'Indraneela Manikkya',
        author: 'Chandana Mendis',
        image: require('../assets/image 1.jpg'),

    },
    {
        id: '2',
        title: 'Bihisunu Nimnaya',
        author: 'Chandana Mendis',
        image: require('../assets/image 2.jpg'),

    },
    {
        id: '3',
        title: 'Pudgalikai Rahasigathai',
        author: 'Chandana Mendis',
        image: require('../assets/image 3.jpeg'),

    },
    {
        id: '4',
        title: 'Apuru Iskole Apuru Dawas',
        author: 'Sudath Rohan',
        image: require('../assets/image 4.jpeg'),

    },
    {
        id: '5',
        title: 'Hari Apuru Iskole ',
        author: 'Sudath Rohan',
        image: require('../assets/image 5.jpg'),

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
