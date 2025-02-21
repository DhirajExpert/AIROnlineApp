import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Button from './button';
import globalstyle from '../core/Style'
import { getJournal, getJournalYear, getJournalSegment, getJournalCourt, getJournalPage } from '../api/api'
import CitationList from './CitationList';

const CitationSearch1 = ({ navigation }) => {
  const [journalsNames, setJournalsNames] = useState([]);
  const [journalYears, setjournalYears] = useState([]);
  const [journalSegment, setjournalSegment] = useState([]);
  const [journalCourt, setjournalCourt] = useState([]);
  const [journalPage, setjournalPage] = useState([]);
  const [showCitations, setShowCitations] = useState(false);
  const [params, setParams] = useState({});

  const scrollViewRef = useRef(null);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    const journalList = async () => {
      response = await getJournal();
      // console.log("response journalList", response.journal);
      const getJournalList = response.journal.map(label => ({ label }));
      console.log("journalsNames", getJournalList);
      setJournalsNames(getJournalList);
    }

    journalList();

  }, []);
  

  const [value, setValue] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);  
  const [selectedYear, setSelectedYear] = useState(null);  
  const [selectedSegment, setSelectedSegment] = useState(null);  
  const [selectedCourt, setSelectedCourt] = useState(null); 
  const [selectedPage, setSelectedPage] = useState(null);  

  const [error, setError] = useState(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleYearDropdownClick = () => {
    if (!selectedJournal) {
      // setError("Please select a journal before selecting the year.");
      // Optionally, show an alert
      Alert.alert('Error', 'Please select a journal first.');
    }
  };

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );

  const handleFirstDropdownChange = async (selectedJournal) => {
    response = await getJournalYear(selectedJournal);
    const getJournalYearList = response.year.map(label => ({ label }));
    setjournalYears(getJournalYearList);
  };

  const handleSecondDropdownChange = async (selectedYear) => {
    response = await getJournalSegment(selectedJournal, selectedYear);
    const getJournalSegmentList = response.publicationSegment.map(label => ({ label }));
    setjournalSegment(getJournalSegmentList);
  }

  const handleThirdDropdownChange = async (selectedSegment) => {
    response = await getJournalCourt(selectedJournal, selectedYear, selectedSegment);
    const getJournalCourtList = response.court.map(label => ({ label }));
    setjournalCourt(getJournalCourtList);
  }
  const handleFourthDropdownChange = async (selectedCourt) => {
    response = await getJournalPage(selectedJournal, selectedYear, selectedSegment, selectedCourt);
    const getJournalPageList = response.pageNo.map(label => ({ label }));
    setjournalPage(getJournalPageList);

  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={globalstyle.safearea}>
      {/* <BackButton goBack={navigation.goBack}/> */}
      <ScrollView>
        <View style={styles.container} >
          {/* <Header>Citation Search Module</Header> */}
          {/* <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>Citation Search Module</Text> */}

          {/* Dropdown for Journal Name */}
          
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalsNames}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Journal Name"
            searchPlaceholder="Search..."
            value={selectedJournal}
            onChange={item => {
              setSelectedJournal(item.label);
              setSelectedYear(null); 
              setError(null); 
              handleFirstDropdownChange(item.label)
            }
            }
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="book" size={20} />
            // )}
            renderItem={renderItem}
            // modal={true}
          />

          {/* Error message display */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {/* Dropdown for Publication Year */}
          
          <Dropdown
            style={styles.dropdown1}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalYears}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Year"
            searchPlaceholder="Search..."
            value={selectedYear}
            onChange={item => {
              if (selectedJournal) {
                setSelectedYear(item.label);
                handleSecondDropdownChange(item.label)
              }
            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="calendar" size={20} />
            // )}
            renderItem={renderItem}
            onFocus={() => {
              const canOpen = handleYearDropdownClick();  
              return canOpen ? {} : { onClose: true }; 
            }}
          />

          
          
          <Dropdown
            style={styles.dropdown4}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalSegment}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="FR/NOC"
            searchPlaceholder="Search..."
            value={selectedSegment}
            onChange={item => {
              setSelectedSegment(item.label);
              handleThirdDropdownChange(item.label)
            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderItem={renderItem} />
          <Dropdown
            style={styles.dropdown3}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalCourt}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Court"
            searchPlaceholder="Search..."
            value={selectedCourt}
            onChange={item => {
              setSelectedCourt(item.label);
              handleFourthDropdownChange(item.label)

            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderItem={renderItem} />
          
          <Dropdown
            style={styles.dropdown2}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalPage}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Page"
            searchPlaceholder="Search..."
            value={selectedPage}
            onChange={item => {
              setSelectedPage(item.label);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderItem={renderItem} />

        </View>

        {/* <Button
          mode="contained"
          onPress={() =>
           
            navigation.navigate('citationList', {
              journal: selectedJournal,
              year: selectedYear,
              segment: selectedSegment,
              court: selectedCourt,
              page: selectedPage,
            })
          }
        >
          Search
        </Button> */}

        <TouchableOpacity
          style={styles.searchButton}
          // onPress={() =>
          //   navigation.navigate('citationList', {
          //     journal: selectedJournal,
          //     year: selectedYear,
          //     segment: selectedSegment,
          //     court: selectedCourt,
          //     page: selectedPage,
          //   })
            // <CitationList
            // journal={selectedJournal}
            // year={selectedYear}
            // segment={selectedSegment}
            // court={selectedCourt}
            // page={selectedPage}
            //  />
            onPress={() => {
              setParams({
                journal: selectedJournal,
                year: selectedYear,
                segment: selectedSegment,
                court: selectedCourt,
                page: selectedPage,
              });
              setShowCitations(true);
            }}
        >
          <MaterialCommunityIcons name="magnify" size={40} color="red" />
        </TouchableOpacity>
        

      </ScrollView>
        {/* <View style={{ marginTop: 80 }}>
          {showCitations && <CitationList {...params} />}
        </View> */}

      
      

        {showCitations && <CitationList {...params} />}
        
      
    </SafeAreaView>
  );
};

export default CitationSearch1;

const styles = StyleSheet.create({

  dropdown: {
    // margin: 15,
    top: 25,
    marginRight: 300,
    marginLeft: 5,
    height: 30,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // width: '100%',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown1: {
    top: -20,
    marginRight: 183,
    marginLeft: 130,
    height: 30,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown2: {
    top: -155,
    marginRight: 73,
    marginLeft: 250,
    height: 30,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    paddingVertical: 4.29,
  },
  dropdown3: {
    top: -55,
    marginRight: 297,
    marginLeft: 5,
    height: 30,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown4: {
    // margin: 15,
    top: -10,
    marginRight: 171,
    marginLeft: 130,
    height: 30,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  searchButton: {
    alignSelf: 'center',
    marginTop: -215,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    marginLeft: 340,
  },
  
  
  icon: {
    marginRight: 5,
  },
  iconImage: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  transparentFab: {
    backgroundColor: 'transparent',
    // backgroundColor: '#6200ea',
    elevation: 0,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 25,
  },
  dropdownContainer: {
    width: '100%',
  },
  
container:{
  flex:1,
  
}
});