import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert,  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCitation } from '../api/api';
import {globalstyle} from '../core/Style';
import Icon from 'react-native-vector-icons/FontAwesome';

const CitationList = ({ journal, year, segment, court, page }) => {
  // const { journal, year, segment, court, page } = route.params;
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitations = async () => {
      try {
        setLoading(true);
        const response = await getCitation(journal, year, segment, court, page);
        if (response && response.citationList) {
          setCitations(response.citationList);
        } else {
          setCitations([]);
        }
      } catch (err) {
        setError(err);
        Alert.alert('Error', err.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchCitations();
  }, [journal, year, segment, court, page]);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Citations</Text>
      <Text style={styles.headerText2}>Party Name</Text>
      <Text style={styles.headerText1}>Topic</Text>
    </View>
  );


  return (
    <SafeAreaView style={globalstyle.safearea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error.message || 'Unknown error'}</Text>
        ) : citations.length > 0 ? (
          <FlatList
            data={citations}
            keyExtractor={(item) => item.citationID || Math.random().toString()}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <View style={styles.citationCard}>
                <View style={styles.row}>
                  <Text style={styles.citationTitle}>{item.citationName}</Text>
                  
                  <View style={styles.separator} />
                  
                  <Text style={styles.partyName}>{item.nominal}</Text>
                  <View style={styles.iconsContainer}>
                  <TouchableOpacity >
                    <Icon name="external-link" size={18} color="#003366" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity >
                    <Icon name="bookmark" size={18} color="#003366" style={[styles.icon, styles.bookmarkIcon]} />
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            )}
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
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#faf6f6 ',
    
    marginTop: -250,
  },
  citationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2, 
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  citationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0056b3', 
    flex: 1,
    textAlign: 'left',
  },
  separator: {
    width: 2,
    backgroundColor: '#ccc',
    height: 50,
    marginHorizontal: 40,
    marginLeft: -5,
  },
  partyName: {
    fontSize: 13,
    color: '#333',
    flex: 2,
    textAlign: 'left',
    left: -30,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  iconsContainer: {
    flexDirection: 'column',  
    justifyContent: 'space-between',
    height: 40, 
    marginRight: 10, 
  },
  icon: {
    marginBottom: 10, 
  },
  bookmarkIcon: {
    marginBottom: 0, 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"#003366",
    flex: 1,
    textAlign: 'left',
  },
  headerText1: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color:"#003366",
  },
  headerText2: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"#003366",
    flex: 1,
    textAlign: 'left',
    left: -45,
  },
});