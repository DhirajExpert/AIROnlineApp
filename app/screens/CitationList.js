import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCitation } from '../api/api';
import Icon from 'react-native-vector-icons/FontAwesome';

const CitationList = ({ journal, year, segment, court, page,volumeNo }) => {

  const navigation = useNavigation();
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchCitations = async (pageNum = 0) => {
    try {
      if (pageNum === 0) setLoading(true);
      else setIsFetchingMore(true);
  
      const limit = 10;
      const offset = pageNum * limit;
      const response = await getCitation(journal, year, segment, court, page, volumeNo,limit, offset);
  
      console.log('Citation response:', response);
  
      if (response && response.citationList) {
        setCitations((prev) => (pageNum === 0 ? response.citationList : [...prev, ...response.citationList]));
      } else {
        if (pageNum === 0) setCitations([]);
      }
    } catch (err) {
      setError(err);
      Alert.alert('Error', err.message || 'Something went wrong!');
    } finally {
      setLoading(false); // 🔹 Ensure loading is stopped
      setIsFetchingMore(false);
    }
  };
  

  useEffect(() => {
    fetchCitations(0); // Fetch first page
  }, [journal, year, segment, court, page]);

  const loadMore = () => {
    if (!isFetchingMore && citations.length >= (currentPage + 1) * 10) {
      setCurrentPage((prev) => {
        const newPage = prev + 1;
        fetchCitations(newPage);
        return newPage;
      });
    }
  };
  

  const renderFooter = () => {
    if (!isFetchingMore || citations.length === 0) return null; // 🔹 Fix: No loader if no more data
    return <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: 10 }} />;
  };


  const CitationClick = (citationName, citationID) => {
    console.log("Citation Click", citationName + citationID);

    navigation.navigate('Judgement', {
      citationID: citationID,
      citationName: citationName
    });

}
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error.message || 'Unknown error'}</Text>
        ) : citations.length > 0 ? (
          <FlatList
            data={citations}
            keyExtractor={(item) => item.citationID || Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.citationCard}>
                <View style={styles.row}>
                  <Text style={styles.citationTitle}>{item.citationName}</Text>
                  <View style={styles.separator} />
                  <Text style={styles.partyName}>{item.nominal}</Text>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity>
                      <Icon name="external-link" size={18} color="#003366" style={styles.icon} onPress={()=>CitationClick(item.citationName, item.citationID)} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon name="bookmark" size={18} color="#003366" style={[styles.icon, styles.bookmarkIcon]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text style={styles.noDataText}>No citations found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CitationList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: -250 },
  safearea: { flex: 1 },
  citationCard: { backgroundColor: '#fff', padding: 15, marginVertical: 5, borderRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  citationTitle: { fontSize: 10, fontWeight: 'bold', color: '#0056b3', flex: 1, textAlign: 'left' },
  separator: { width: 2, backgroundColor: '#ccc', height: 50, marginHorizontal: 40, marginLeft: -5 },
  partyName: { fontSize: 13, color: '#333', flex: 2, textAlign: 'left', left: -30 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
  noDataText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  iconsContainer: { flexDirection: 'column', justifyContent: 'space-between', height: 40, marginRight: 10 },
  icon: { marginBottom: 10 },
  bookmarkIcon: { marginBottom: 0 },
});
