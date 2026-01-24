import React, { useState, useEffect } from "react";
import {
    Text, Image, View, StyleSheet,
    FlatList, TextInput, TouchableOpacity, Dimensions
} from "react-native";
import Card from "../components/common/Card";
import { useDispatch, useSelector } from 'react-redux';
import { processAndSetMembers } from '../store/employeeSlice';
import { Colors, Spacing } from '../styles/globalStyles'; 

const { width } = Dimensions.get("window");

const DataGrid = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch();
    const { allMembers, categories } = useSelector(state => state.employees); 

    const getData = async () => {
        try {
            const response = await fetch("https://69724a6f32c6bacb12c67b5f.mockapi.io/employees");
            const json = await response.json();
            dispatch(processAndSetMembers(json)); 
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => { getData(); }, []);

    useEffect(() => {
        setFilteredData(allMembers);
    }, [allMembers]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = allMembers.filter(item => 
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

    const getGroupName = (memberId) => {
        if (!categories) return 'Other';
        const group = Object.keys(categories).find(key => 
            categories[key].includes(memberId)
        );
        return group || 'Other';
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <Card>
                <View style={styles.gridContent}>
                    <Text style={styles.groupBadge}>{getGroupName(item.id)}</Text>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.emailText}>{item.email}</Text>
                </View>
            </Card>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Employee Directory</Text>

                <TextInput
                    style={styles.searchBar}
                    placeholder="Search name or title..."
                    placeholderTextColor={Colors.textSecondary}
                    value={searchQuery}
                    onChangeText={handleSearch}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background }, 
    header: { padding: 15, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
    headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: Colors.textPrimary },
    searchBar: {
        height: 45,
        backgroundColor: Colors.background, 
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        color: Colors.textPrimary
    },
    sortRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    sortLabel: { fontSize: 14, color: Colors.textSecondary, marginRight: 10 },
    sortBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        marginRight: 8,
    },
    sortBtnText: { color: Colors.white, fontSize: 12, fontWeight: '600' },
    listContainer: { padding: 5, paddingBottom: 100 },
    cardWrapper: { flex: 1, maxWidth: (width / 2) - 10, margin: 5 },
    gridContent: { alignItems: 'center', paddingVertical: 15 },
    groupBadge: {
        fontSize: 9,
        color: Colors.primary,
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginBottom: 8,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 10, backgroundColor: Colors.border },
    titleText: { fontSize: 10, color: Colors.primary, fontWeight: 'bold', textTransform: 'uppercase' },
    nameText: { fontSize: 15, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 4 },
    emailText: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
    emptyText: { textAlign: 'center', marginTop: 50, color: Colors.textSecondary }
});

export default DataGrid;