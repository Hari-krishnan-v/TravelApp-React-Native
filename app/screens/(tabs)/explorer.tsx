import {StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {createClient} from 'pexels';
import {Video} from 'expo-av';
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import {useNavigation} from "@react-navigation/native";
import Header, {DefaultHeader} from "@/components/homeComponents/header";
import {LinearGradient} from "expo-linear-gradient";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

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
                const response = await client.videos.search({query, per_page: 10, page});
                if (response && response.videos) {
                    setVideos(response.videos);
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [page]);


    const renderItem = useCallback(({item}) => (
        <View style={styles.videoContainer}>
            <Video
                source={{uri: item.video_files[0].link}}
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
            <DefaultHeader title={"Explore"}/>
            <LinearGradient style={{position: "absolute", bottom: 0, zIndex: 100, width: "100%", height: hp("20%")}}
                            colors={["rgba(255,255,255,0)", "rgb(255,255,255)"]}/>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<Text>No videos available</Text>}
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
