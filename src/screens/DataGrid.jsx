import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Image, View, StyleSheet, 
    FlatList, TextInput, TouchableOpacity, Dimensions 
} from "react-native";
import Card from "../components/common/Card";

const { width } = Dimensions.get("window");

const DataGrid = () => {
    
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");

    const getData = async () => {
        try {
            const response = await fetch("https://69724a6f32c6bacb12c67b5f.mockapi.io/employees");
            const json = await response.json();
            setData(json);
            setFilteredData(json); 
        } catch (error) {
            console.error("Fetch error:", error);
        }   
    };

    useEffect(() => {
        getData();
    }, []);

    
    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = data.filter(item => 
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    
    const sortData = (criterion) => {
        const sorted = [...filteredData].sort((a, b) => 
            a[criterion].localeCompare(b[criterion])
        );
        setFilteredData(sorted);
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <Card>
                <View style={styles.gridContent}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.emailText}>{item.email}</Text>
                </View>
            </Card>
        </View>
    );

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Employee Directory</Text>
                
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search name or title..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    clearButtonMode="while-editing"
                />

                <View style={styles.sortRow}>
                    <Text style={styles.sortLabel}>Sort by:</Text>
                    <TouchableOpacity onPress={() => sortData('name')} style={styles.sortBtn}>
                        <Text style={styles.sortBtnText}>Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sortData('title')} style={styles.sortBtn}>
                        <Text style={styles.sortBtnText}>Role</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No employees found.</Text>}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { padding: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#1A1A1A' },
    searchBar: {
        height: 45,
        backgroundColor: '#576064ff',
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    sortRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    sortLabel: { fontSize: 14, color: '#666', marginRight: 10 },
    sortBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        marginRight: 8,
    },
    sortBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
    listContainer: { padding: 5 },
    cardWrapper: { flex: 1, maxWidth: (width / 2) - 10, margin: 5 },
    gridContent: { alignItems: 'center', padding: 10 },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, backgroundColor: '#DDD' },
    titleText: { fontSize: 10, color: '#007AFF', fontWeight: 'bold', textTransform: 'uppercase' },
    nameText: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 4 },
    emailText: { fontSize: 11, color: '#888', marginTop: 2 },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default DataGrid;