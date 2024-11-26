import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import globalstyle from '../core/Style';

import { getJournal, getJournalYear, getJournalSegment, getJournalCourt, getJournalPage } from '../api/api'
import BackButton from '../components/BackButton';

const CitationSearch1 = ({ navigation }) => {
  const [journalsNames, setJournalsNames] = useState([]);
  const [journalYears, setjournalYears] = useState([]);
  const [journalSegment, setjournalSegment] = useState([]);
  const [journalCourt, setjournalCourt] = useState([]);
  const [journalPage, setjournalPage] = useState([]);
  useEffect(() => {
    const journalList = async () => {
      response = await getJournal();
      console.log("response journalList", response.journal);
      const getJournalList = response.journal.map(label => ({ label }));
      console.log("journalsNames", getJournalList);
      setJournalsNames(getJournalList);
    }

    journalList();

  }, []);
  // useEffect(() => {

  //   const journalyearList = async () => {
  //     response = await getJournalYear();
  //     console.log("journal year", response);
  //   }
  //   journalyearList();
  // }, [selectedJournal]);

  // useEffect(() => {

  //   const journalcourtList = async () => {
  //     response = await getJournalCourt();

  //   }
  //   journalcourtList();
  // }, [selectedJournal, selectedYear])

  // useEffect(() => {
  //   const journalPageList = async () => {
  //     response = await getJournalPage();
  //   }
  //   journalPageList();
  // }, [])

  const [value, setValue] = useState(null);

  // const renderItem = item => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.textItem}>{item.label}</Text>
  //       {item.value === value && (
  //         <AntDesign
  //           style={styles.icon}
  //           color="black"
  //           name="Safety"
  //           size={20}
  //         />
  //       )}
  //     </View>
  //   );
  // };


  const [selectedJournal, setSelectedJournal] = useState(null);  // State for journal name
  const [selectedYear, setSelectedYear] = useState(null);  // State for publication year
  const [selectedSegment, setSelectedSegment] = useState(null);  // State for publication year
  const [selectedCourt, setSelectedCourt] = useState(null);  // State for publication year
  const [selectedPage, setSelectedPage] = useState(null);  // State for publication year

  const [error, setError] = useState(null);



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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={globalstyle.safearea}>
      {/* <BackButton goBack={navigation.goBack}/> */}
      <ScrollView>
        <View >
          <Header>Citation Search Module</Header>
          {/* <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>Citation Search Module</Text> */}

          {/* Dropdown for Journal Name */}
          <Text style={{ marginLeft: 15, fontFamily: 'Signika-SemiBold' }}>Publication Name:</Text>
          <Dropdown
            style={styles.dropdown}
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
              setSelectedYear(null); // Reset year selection when journal changes
              setError(null); // Clear error when a valid journal is selected
              handleFirstDropdownChange(item.label)
            }
            }
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="book" size={20} />
            )}
            renderItem={renderItem}
          />

          {/* Error message display */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {/* Dropdown for Publication Year */}
          <Text style={{ marginLeft: 15 }}>Publication Year:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalYears}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Journal Year"
            searchPlaceholder="Search..."
            value={selectedYear}
            onChange={item => {
              if (selectedJournal) {
                setSelectedYear(item.label);
                handleSecondDropdownChange(item.label)
              }
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="calendar" size={20} />
            )}
            renderItem={renderItem}
            onFocus={() => {
              const canOpen = handleYearDropdownClick();  // Check if the year dropdown can be opened
              return canOpen ? {} : { onClose: true }; // Prevent the dropdown from opening if validation fails
            }}
          />

          {/* <Text style={{ marginLeft: 15 }}>Publication Name:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journals}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Journal Name"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem} />
          <Text style={{ marginLeft: 15 }}>Publication Year:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journals}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Journal Year"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem} /> */}
          <Text style={{ marginLeft: 15 }}>Publication Segmant:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalSegment}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Full Report/NOC"
            searchPlaceholder="Search..."
            value={selectedSegment}
            onChange={item => {
              setSelectedSegment(item.label);
              handleThirdDropdownChange(item.label)
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem} />
          <Text style={{ marginLeft: 15 }}>Judicial Body/Court Name:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalCourt}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Judicial Body"
            searchPlaceholder="Search..."
            value={selectedCourt}
            onChange={item => {
              setSelectedCourt(item.label);
              handleFourthDropdownChange(item.label)

            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem} />
          <Text style={{ marginLeft: 15 }}>Publication Number::</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={journalPage}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Select Page No"
            searchPlaceholder="Search..."
            value={selectedPage}
            onChange={item => {
              setSelectedPage(item.label);
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem} />

        </View>

        <Button
          mode="contained"
          onPress={() =>
            // navigation.navigate('CitationList', 
            // { journal: selectedJournal,
            //    year: selectedYear, 
            //    segment: selectedSegment,
            //     court: selectedCourt, 
            //     page: selectedPage 

            // })
            navigation.navigate('CitationList', {
              journal: selectedJournal,
              year: selectedYear,
              segment: selectedSegment,
              court: selectedCourt,
              page: selectedPage,
            })
          }
        >
          Log in
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CitationSearch1;

const styles = StyleSheet.create({
  
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     flexDirection: "column"

// },
  dropdown: {
    // margin: 15,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
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
  icon: {
    marginRight: 5,
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
});