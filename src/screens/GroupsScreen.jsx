import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../styles/globalStyles';

const ExpandableCategory = ({ categoryName, memberIds, allMembers }) => {
  const [expanded, setExpanded] = useState(false);
  const filteredMembers = allMembers.filter(m => memberIds.includes(m.id));

  if (filteredMembers.length === 0) return null; 

  return (
    <View style={styles.catContainer}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.catTitle}>{categoryName} ({filteredMembers.length})</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.memberList}>
          {filteredMembers.map(member => (
            <View key={member.id} style={styles.memberRow}>
               <Text style={styles.memberName}>{member.name}</Text>
               <Text style={styles.memberTitle}>{member.title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const GroupsScreen = () => {
  const { categories, allMembers } = useSelector(state => state.employees);

  return (
    <FlatList
      data={Object.keys(categories)}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <ExpandableCategory 
          categoryName={item} 
          memberIds={categories[item]} 
          allMembers={allMembers} 
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  catContainer: { marginBottom: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  catTitle: { fontWeight: '600', fontSize: 16 },
  memberList: { backgroundColor: '#F9F9F9', padding: 15 },
  memberRow: { paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: '#DDD' },
  memberName: { fontWeight: 'bold', fontSize: 14 },
  memberTitle: { fontSize: 12, color: '#666' }
});

export default GroupsScreen;