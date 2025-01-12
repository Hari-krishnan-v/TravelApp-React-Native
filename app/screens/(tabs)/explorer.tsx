import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from 'pexels';
import { Video } from 'expo-av';
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/homeComponents/header";

const Explorer = () => {
    const client = createClient('Tg7YxpCgArtwY1F0JMoqzW0fpbSiEPIlspfoqMLm7IHRsaVlE2uQ8nw6');
    const query = 'travel';
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await client.videos.search({ query, per_page: 10, page });
                if (response && response.videos) {
                    setVideos((prevVideos) => [...prevVideos, ...response.videos]);
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [page]);

    const loadMoreVideos = () => {
        if (!loading) {
            setPage(page + 1);
        }
    };

    const renderItem = useCallback(({ item }) => (
        <View style={styles.videoContainer}>
            <Video
                source={{ uri: item.video_files[0].link }}
                style={styles.video}
                shouldPlay={false}
                controls={false}
                resizeMode="cover"
                isLooping={true}
            />
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <Header title={"Explore"}/>

            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                onEndReached={loadMoreVideos}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<Text>No videos available</Text>}
                ListFooterComponent={loading && <ActivityIndicator size="large" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: Colors.light.background,
    },
    gridContainer: {
        padding: 10,
    },
    videoContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: 300,
        borderRadius: 8,
    },
});

export default Explorer;
