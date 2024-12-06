import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safearea: {
        flex: 1,
        paddingHorizontal: 20
      },

      judges:{
        fontFamily: 'Signika_600SemiBold'
    },
    courts:{
        fontSize: 16,
        color: '#000',
        fontWeight:'bold'
    },
    nominal:{
        fontSize: 16,
        color: '#000',
    },
    combineDod:{
        fontSize: 13,
        color: '#787775',
    },
    noteLText: {
      fontSize: 14,
      color: '#333',
      textAlign: 'justify',
      fontFamily:'Signika_300Light'
  },
  showMoreText: {
      fontSize: 14,
      color: 'blue',
      marginTop: 4,
      fontWeight: 'bold'
  },
  noteText: {
      marginTop: 5,
      fontSize: 14,
      color: '#333',
      fontWeight: 'bold',
      textAlign: 'justify',
      fontFamily:'Signika_600SemiBold',
      

  },
  noteContainer: {
    padding: 5,
    backgroundColor: '#eef',
    marginTop: 8,
    borderRadius: 4
},

})