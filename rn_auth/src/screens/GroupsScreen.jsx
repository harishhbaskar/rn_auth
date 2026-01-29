import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { SectionList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const GroupsScreen = () => {
  const { categories, allMembers } = useSelector(state => state.employees);
  const [loading, setLoading] = useState(true);
  
  
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    if (allMembers && allMembers.length > 0) {
      setLoading(false);
    }
  }, [allMembers]);

  
  const toggleSection = (title) => {
    const next = new Set(expandedSections);
    if (next.has(title)) {
      next.delete(title);
    } else {
      next.add(title);
    }
    setExpandedSections(next);
  };

  
  const sections = useMemo(() => {
    return Object.keys(categories)
      .map(categoryName => {
        const isExpanded = expandedSections.has(categoryName);
        return {
          title: categoryName,
          
          data: isExpanded 
            ? allMembers.filter(m => categories[categoryName].includes(m.id)) 
            : [],
          isExpanded,
          totalCount: categories[categoryName].length
        };
      });
  }, [categories, allMembers, expandedSections]);

  const renderMember = useCallback(({ item }) => (
    <View style={styles.memberRow}>
      <Text style={styles.memberName}>{item.name}</Text>
      <Text style={styles.memberTitle}>{item.title}</Text>
    </View>
  ), []);

  const renderSectionHeader = useCallback(({ section: { title, isExpanded, totalCount } }) => (
    <TouchableOpacity 
      style={styles.header} 
      onPress={() => toggleSection(title)}
      activeOpacity={0.7}
    >
      <Text style={styles.catTitle}>
        {title.toUpperCase()} ({totalCount})
      </Text>
      <Icon 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={20} 
        color={Colors.primary} 
      />
    </TouchableOpacity>
  ), [categories, expandedSections]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loaderText}>Loading Groups...</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMember}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}
      contentContainerStyle={styles.listPadding}
      
      
      initialNumToRender={10}
      windowSize={5}
      removeClippedSubviews={true} 
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  loaderText: { marginTop: 10, color: Colors.textSecondary, fontSize: 14 },
  listPadding: { paddingBottom: 100 },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white, 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.border,
    marginTop: 1 
  },
  catTitle: { fontWeight: '700', fontSize: 14, color: Colors.primary },
  memberRow: { 
    padding: 15, 
    backgroundColor: '#FDFDFD', 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#EEE',
    paddingLeft: 25 
  },
  memberName: { fontWeight: 'bold', fontSize: 14, color: Colors.textPrimary },
  memberTitle: { fontSize: 12, color: Colors.textSecondary },
});

export default GroupsScreen;