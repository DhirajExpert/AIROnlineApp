import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
// import https from "http";

// const API_URL = "http://192.168.0.102:8082/aironline";
import useAuthStore from '../authStore';
// const API_URL = "http://192.168.0.99:8080/aironline"; //testserver
// const API_URL = "https://aisnagpur.com/aironline"; //hosted 
// const API_URL = "http://128.127.60.8:8085/aironline"; //Conference
// const API_URL = "http://192.168.1.6:8085/aironline"; //Arbitration

// const API_URL = "http://192.168.137.62:8085/aironline"; // arbitratiion
const API_URL = "http://192.168.0.152:8080/aironline";  //sonali
// const API_URL = "http://10.8.8.14:8082/aironline";  //amtit

//  const logout = useAuthStore((set) => set.logout);

// const agent = new https.Agent({ rejectUnauthorized: false });

axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;
let token;
const getUserData = async () => {
  try {
    const authData = await SecureStore.getItemAsync('authLogin');

    if (authData) {
      const { userData, token } = JSON.parse(authData);
      console.log('User Data:', userData);
      console.log('Token:', token);
      return { userData, token };
    } else {
      console.log('No user data found');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
};

getUserData().then((data) => {
  if (data) {
    console.log('User is logged in:', data.userData);
    console.log('User is logged in token:', data.token);
    token = data.token;
    console.log('User', token);


  } else {
    console.log('User is not logged in');
  }
});

// const token1 = await getToken();

//   if (!token) {
//     throw new Error('No token available');
//   }

// await SecureStore.setItemAsync('authLogin', token1, {
//   keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
// });


// await SecureStore.deleteItemAsync('authLogin');

const getToken = async () => {
  try {
    const authData = await SecureStore.getItemAsync('authLogin');
    if (!authData) {
      console.error('No auth data found');
      return null;
    }
    const { token } = JSON.parse(authData);
    console.log('Retrieved Token:', token);  // Log the token to verify
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};



export const getJournal = async () => {

  const token = await getToken();

  if (!token) {
    throw new Error('No token available');
  }
  try {
    console.log('Authorization Header:', `Bearer ${token}`);
    const response = await axios.get(`${API_URL}/api/citation/journalName`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
    });
    console.log("journal", response.data);
    return response.data;
  }
  catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }



}
export const getJournalYear = async (journalName) => {
  const token = await getToken();


  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/api/citation/journalYear`,

      {
        params: {
          journalName: journalName
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });

    return response.data;
  }
  catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}

export const getJournalSegment = async (journalName, journalYear) => {

  const token = await getToken();


  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/api/citation/publication/segment`,


      {
        params: {
          journalName: journalName,
          journalYear: journalYear
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
    return response.data;
  }
  catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getJournalCourt = async (journalName, journalYear, journalSegmant, volumeNo) => {

  const token = await getToken();


  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/api/citation/courtName`,

      {
        params: {
          journalName: journalName,
          journalYear: journalYear,
          publicationSegment: journalSegmant,
          volumeNo: volumeNo || ''
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getJournalPage = async (journalName, journalYear, journalSegmant, journalCourt, volumeNo) => {

  const token = await getToken();

  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/api/citation/pageNo`,

      {
        params: {
          journalName: journalName,
          journalYear: journalYear,
          publicationSegment: journalSegmant,
          courtName: journalCourt,
          volumeNo: volumeNo || ''
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getCitation = async (journalName, journalYear, journalSegmant, journalCourt, journalPage, volumeNo,limit,offset) => {

  const token = await getToken();


  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/api/citation/citationList`,
      {
        params: {
          journalName: journalName,
          journalYear: journalYear,
          publicationSegment: journalSegmant,
          courtName: journalCourt,
          pageNumber: journalPage,
          volumeNo: volumeNo || '',
          limit:limit,
          offset:offset
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getjudgement = async (citationID) => {

  const token = await getToken();


  if (!token) {
    throw new Error('No token available');
  }

  try {
    const response = await axios.get(`${API_URL}/api/judgement`,
      {
        params: { citationID },
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    console.log("api res", response.data);
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getCourtList = async (courtName) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  try {
    const response = await axios.get(`${API_URL}/court/courtNamelist`,

      {
        params: {
          searchCourtName: courtName || ''
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}





export const getCourtDigestView = async (courtNameList, limit, offset) => {

  console.log(`${API_URL}/digestView/digest?court=` + courtNameList + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + '' + `&or=` + '' + `&and=` + '' + `&benchTypeFullName=` + '' + `&searchLawyerName=` + '' + `&lawyerFlag=` + '' + `&actName=` + '' + `&section=` + '' + `&section=` + '' + `&actSectionFlag=` + '' + `&searchFlag=` + '' + `&decision_period=` + '' + `&fromDate=` + '' + `&toDate=` + '' + `&judgmentDateFlag=` + '' + `&searchPhrase=` + '' + `&sortOrder=` + '' + `&proximitySearch=` + 0 + `&fieldsSearch=` + '');


  try {
    const response = await axios.get(`${API_URL}/digestView/digest?court=` + courtNameList + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + '' + `&or=` + '' + `&and=` + '' + `&benchTypeFullName=` + '' + `&searchLawyerName=` + '' + `&lawyerFlag=` + '' + `&actName=` + '' + `&section=` + '' + `&section=` + '' + `&actSectionFlag=` + '' + `&searchFlag=` + '' + `&decision_period=` + '' + `&fromDate=` + '' + `&toDate=` + '' + `&judgmentDateFlag=` + '' + `&searchPhrase=` + '' + `&sortOrder=` + '' + `&proximitySearch=` + 0 + `&fieldsSearch=` + '');
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getNominalCourt = async () => {
  try {
    const response = await axios.get(`${API_URL}/nominal/courtName`);
    return response.data;

  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getNominalDetails = async (nominalSearch, courtName, searchString, limit, page) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  try {
    const response = await axios.get(`${API_URL}/nominal/nominalList`,

      {
        params: {
          nominalSearch: nominalSearch,
          courtName: courtName,
          searchString: searchString,
          limit: 10,
          offset: page

        },
        headers: {
          Authorization: `Bearer ${token}`
        }

      })




    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getLawyer = async (lawyerName, limit, page) => {
  console.log("API", `${API_URL}/digestView/digest?searchLawyerName=` + lawyerName + `&limit=10&offset=` + page + `&court=` + '' + `&judges=` + '' + `&benchStrength=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + '' + `&or=` + '' + `&and=` + '' + `&benchTypeFullName=` + '' + `&lawyerFlag=` + 'lawyer' + `&actName=` + '' + `&section=` + '' + `&section=` + '' + `&actSectionFlag=` + '' + `&searchFlag=` + '' + `&decision_period=` + '' + `&fromDate=` + '' + `&toDate=` + '' + `&judgmentDateFlag=` + '' + `&searchPhrase=` + '' + `&sortOrder=` + '' + `&proximitySearch=` + 0 + `&fieldsSearch=` + '');

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          fts: '',
          limit: limit,
          offset: page,
          judges: '',
          benchStrength: '',
          court: '',
          acs: '',
          or: '',
          and: '',
          benchTypeFullName: '',
          searchLawyerName: lawyerName || '',
          lawyerFlag: '',
          actName: '',
          section: '',
          actSectionFlag: '',
          searchFlag: '',
          decision_period: '',
          fromDate: '',
          toDate: '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: '',
          case_result: '',
          nominal_app: '',
          nominal_res: '',
          year_decision: '',
          topical: '',
          searchInSearch: ''
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getBenchStrength = async () => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/benchstrength/benchName`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("API", `${API_URL}/benchstrength/benchName`);
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getJudgementDateDetails = async (decision_period, fromDate, toDate, limit, offset, courts, judge, benchStrength, Case_Results, Decision_Years, nominal_app, nominal_res, topics, acts, section, searchFilter, searchInSearch,) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          benchStrength: Array.isArray(benchStrength) ? benchStrength.join(',') : benchStrength || '',
          limit: limit,
          offset: offset,
          judges: Array.isArray(judge) ? judge.join(',') : judge || '',
          court: Array.isArray(courts) ? courts.join(',') : courts || '',
          fts: '',
          acs: '',
          topical: '',
          or: '',
          and: '',
          benchTypeFullName: '',
          searchLawyerName: '',
          lawyerFlag: '',
          actName: Array.isArray(acts) ? acts.join(',') : acts || '',
          section: Array.isArray(section) ? section.join(',') : section || '',
          actSectionFlag: '',
          searchFlag: '',
          decision_period: decision_period || '',
          fromDate: fromDate || '',
          toDate: toDate || '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: searchFilter || '',
          case_result: Array.isArray(Case_Results) ? Case_Results.join(',') : Case_Results || '',
          nominal_app: Array.isArray(nominal_app) ? nominal_app.join(',') : nominal_app || '',
          nominal_res: Array.isArray(nominal_res) ? nominal_res.join(',') : nominal_res || '',
          year_decision: Array.isArray(Decision_Years) ? Decision_Years.join(',') : Decision_Years || '',
          topical: Array.isArray(topics) ? topics.join(',') : topics || '',
          searchInSearch: searchInSearch || ''


        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }

}

export const getBenchStrengthDetails = async (benchStrength, benchTypeFullName, limit, offset) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("getBenchStrengthDetails", `${API_URL}/digestView/digest?benchStrength=` + benchStrength + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&court=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + '' + `&or=` + '' + `&and=` + '' + `&benchTypeFullName=` + benchTypeFullName + `&searchLawyerName=` + '' + `&lawyerFlag=` + '' + `&actName=` + '' + `&section=` + '' + `&section=` + '' + `&actSectionFlag=` + '' + `&searchFlag=` + '' + `&decision_period=` + '' + `&fromDate=` + '' + `&toDate=` + '' + `&judgmentDateFlag=` + '' + `&searchPhrase=` + '' + `&sortOrder=` + '' + `&proximitySearch=` + 0 + `&fieldsSearch=` + '');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          benchStrength: benchStrength || '',
          limit: limit,
          offset: offset,
          judges: '',
          court: '',
          fts: '',
          acs: '',
          topical: '',
          or: '',
          and: '',
          benchTypeFullName: benchTypeFullName || '',
          searchLawyerName: '',
          lawyerFlag: '',
          actName: '',
          section: '',

          actSectionFlag: '',
          searchFlag: '',
          decision_period: '',
          fromDate: '',
          toDate: '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: '',
          case_result: '',
          nominal_app: '',
          nominal_res: '',
          year_decision: '',
          topical: '',
          searchInSearch: ''


        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getFTSDigestView = async (fts, limit, offset, courts, judges, benchStrength, Case_Results, Decision_Years, nominal_app, nominal_res, topics, acts, section, searchFilter, searchInSearch,judgeFilter,article,judgmentText) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("Api",
    {
      fts: fts,
      limit: limit,
      offset: offset,
      judges: judges || '',
      benchStrength: '',
      court: courts || '',
      acs: '',
      or: '',
      and: '',
      benchTypeFullName: benchStrength || '',
      searchLawyerName: '',
      lawyerFlag: '',
      actName: acts || '',
      section: '',
      actSectionFlag: '',
      searchFlag: '',
      decision_period: Decision_Years || '',
      fromDate: '',
      toDate: '',
      judgmentDateFlag: '',
      searchPhrase: 'allWords',
      sortOrder: 'desc',
      proximitySearch: 0,
      fieldsSearch: 'Citation_Year',
      searchFilter: searchFilter || '',
      case_result: Case_Results || '',
      nominal_app: nominal_app || '',
      nominal_res: nominal_res || '',
      year_decision: Decision_Years || '',
      topical: topics || '',
      searchInSearch: searchInSearch || '',
      judgeFilter: judgeFilter || '',
      article: article || '',
      judgmentText: judgmentText || '',
      



    }
  );

  try {

    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          fts: fts,
          limit: limit,
          offset: offset,
          judges: Array.isArray(judges) ? judges.join(',') : judges || '',
          benchStrength: '',
          court: Array.isArray(courts) ? courts.join(',') : courts || '',
          acs: '',
          topical: '',
          or: '',
          and: '',
          benchTypeFullName: benchStrength || '',
          searchLawyerName: '',
          lawyerFlag: '',
          actName: Array.isArray(acts) ? acts.join(',') : acts || '',
          section: Array.isArray(section) ? section.join(',') : section || '',
          actSectionFlag: '',
          searchFlag: '',
          decision_period: Decision_Years || '',
          fromDate: '',
          toDate: '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: searchFilter || '',
          case_result: Array.isArray(Case_Results) ? Case_Results.join(',') : Case_Results || '',
          nominal_app: Array.isArray(nominal_app) ? nominal_app.join(',') : nominal_app || '',
          nominal_res: Array.isArray(nominal_res) ? nominal_res.join(',') : nominal_res || '',
          year_decision: Array.isArray(Decision_Years) ? Decision_Years.join(',') : Decision_Years || '',
          topical: Array.isArray(topics) ? topics.join(',') : topics || '',
          searchInSearch: searchInSearch || '',
          judgeFilter: judgeFilter || '',
          article: article || '',
          judgmentText: judgmentText || '',
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getTopicalDigestView = async (searchword, limit, offset) => {

  console.log(`${API_URL} /digestView/digest ? topical = ` + searchword + ` & limit=` + limit + ` & offset=` + offset + ` & judges=` + '' + ` & benchStrength=` + '' + ` & court=` + '' + ` & acs=` + '' + ` & fts=` + '' + ` & or=` + '' + ` & and=` + '' + ` & benchTypeFullName=` + '' + ` & searchLawyerName=` + '' + ` & lawyerFlag=` + '' + ` & actName=` + '' + ` & section=` + '' + ` & section=` + '' + ` & actSectionFlag=` + '' + ` & searchFlag=` + '' + ` & decision_period=` + '' + ` & fromDate=` + '' + ` & toDate=` + '' + ` & judgmentDateFlag=` + '' + ` & searchPhrase=` + '' + ` & sortOrder=` + '' + ` & proximitySearch=` + 0 + ` & fieldsSearch=` + '');
  try {
    const response = await axios.get(`${API_URL} /digestView/digest ? topical = ` + searchword + ` & limit=` + limit + ` & offset=` + offset + ` & judges=` + '' + ` & benchStrength=` + '' + ` & court=` + '' + ` & acs=` + '' + ` & fts=` + '' + ` & or=` + '' + ` & and=` + '' + ` & benchTypeFullName=` + '' + ` & searchLawyerName=` + '' + ` & lawyerFlag=` + '' + ` & actName=` + '' + ` & section=` + '' + ` & section=` + '' + ` & actSectionFlag=` + '' + ` & searchFlag=` + '' + ` & decision_period=` + '' + ` & fromDate=` + '' + ` & toDate=` + '' + ` & judgmentDateFlag=` + '' + ` & searchPhrase=` + '' + ` & sortOrder=` + '' + ` & proximitySearch=` + 0 + ` & fieldsSearch=` + '');
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getTopicalWords = async (topic) => {
  console.log(`${API_URL} /topic/topicname ? searchTopic = ` + topic);
  try {
    const response = await axios.get(`${API_URL} /topic/topicname ? searchTopic = ` + topic);
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getStatuesActList = async (actType, alphabeticleName, stateName) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("ActList", `${API_URL} /act/statue_actList ? actOriginType = ` + actType + `&alphabeticleName=` + alphabeticleName + `&stateName=` + stateName + '&limit=10' + '&offset=0');
  try {
    const response = await axios.get(`${API_URL}/act/statue_actList`,
      {
        params: {
          actOriginType: actType || '',
          alphabeticleName: alphabeticleName || '',
          stateName: stateName || '',
          limit: 10,
          offset: 0
        },
        headers: {
          Authorization: `Bearer ${token}`
        }

      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getStateActList = async (actType) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("ActList", `${API_URL} /act/act_stateName ? actOriginType = ` + actType);
  try {
    const response = await axios.get(`${API_URL}/act/act_stateName`,
      {
        params: {
          actOriginType: actType || '',
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}



export const getActFullText = async (actName, actID) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("ActFulltext", `${API_URL} /act/act_fullText ? actName = ` + actName + `&actID=` + actID);

  try {
    const response = await axios.get(`${API_URL}/act/act_fullText`,
      {
        params: {

          actName: actName || '',
          actID: actID || '',

        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    console.log("central", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}


export const mlogin = async (username, password) => {

  console.log("login", `${API_URL}/api/auth/public/signin?username=` + username + `&password=` + password);

  try {
    const response = await axios.post(`${API_URL}/api/auth/public/signin`,
      {
        username: username || '',
        password: password || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow CORS
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        timeout: 15000, // 10 seconds timeout
        withCredentials: true,
        validateStatus: () => true,
      },


    );
    return response;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

// export const mlogin = async (username, password) => {
//   const url = `${API_URL}/api/auth/public/signin`;
//   console.log("Fetching from:", url);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetch Response:", data);
//     return data;
//   } catch (error) {
//     console.log("Fetch Error:", error.message);
//     console.log("Full Error:", JSON.stringify(error, null, 2));
//     throw "Fetch request failed";
//   }
// };







export const RegisterApi = async (name, email, mobno, password, fullname) => {
  console.log(`${API_URL} /opi/users / registration ? username = ` + name +
    `& password=` + password +
    `& email=` + email +
    `& fullName=` + fullname +
    `& mobileNumber=` + mobno +
    `& countryCode=` + 91);
  try {
    const response = await axios.get(`${API_URL} /opi/users / registration ? username = ` + name +
      `& password=` + password +
      `& email=` + email +
      `& fullName=` + fullname +
      `& mobileNumber=` + mobno +
      `& countryCode=` + 91);
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getJudgesList = async (name) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /judge/judgeNameList?searchJudgeName = ` + name);
  try {
    const response = await axios.get(`${API_URL}/judge/judgeNameList`, {
      params: {
        searchJudgeName: name
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getJudgeDetails = async (judge, or, and, limit, offset, courts, benchStrength, Case_Results, Decision_Years, nominal_app, nominal_res, topics, acts, section, searchFilter, searchInSearch,) => {


  console.log("getJudgeDetails", `${API_URL} /digestView/digest ? judges = ` + judge + ` & limit=` + limit + ` & offset=` + offset + ` & court=` + courts + ` & fts=` + '' + ` & acs=` + '' + ` & topical=` + '' + ` & or=` + or + ` & and=` + and + ` & benchTypeFullName=` + '' + ` & benchStrength=` + '' + ` & searchLawyerName=` + '' + ` & lawyerFlag=` + '' + ` & actName=` + '' + ` & section=` + '' + ` & section=` + '' + ` & actSectionFlag=` + '' + ` & searchFlag=` + '' + ` & decision_period=` + '' + ` & fromDate=` + '' + ` & toDate=` + '' + ` & judgmentDateFlag=` + '' + ` & searchPhrase=` + 'allWords' + ` & sortOrder=` + '' + ` & proximitySearch=` + 0 + ` & fieldsSearch=` + '' + '&searchFilter=' + searchFilter);
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log("judge data in api",
    {
      benchStrength: Array.isArray(benchStrength) ? benchStrength.join(',') : benchStrength || '',
      limit: limit,
      offset: offset,
      judges: Array.isArray(judge) ? judge.join(',') : judge || '',
      court: Array.isArray(courts) ? courts.join(',') : courts || '',
      fts: '',
      acs: '',
      topical: '',
      or: or || '',
      and: and || '',
      benchTypeFullName: '',
      searchLawyerName: '',
      lawyerFlag: '',
      actName: Array.isArray(acts) ? acts.join(',') : acts || '',
      section: Array.isArray(section) ? section.join(',') : section || '',
      actSectionFlag: '',
      searchFlag: '',
      decision_period: '',
      fromDate: '',
      toDate: '',
      judgmentDateFlag: '',
      searchPhrase: 'allWords',
      sortOrder: 'desc',
      proximitySearch: 0,
      fieldsSearch: 'Citation_Year',
      searchFilter: searchFilter || '',
      case_result: Array.isArray(Case_Results) ? Case_Results.join(',') : Case_Results || '',
      nominal_app: Array.isArray(nominal_app) ? nominal_app.join(',') : nominal_app || '',
      nominal_res: Array.isArray(nominal_res) ? nominal_res.join(',') : nominal_res || '',
      year_decision: Array.isArray(Decision_Years) ? Decision_Years.join(',') : Decision_Years || '',
      topical: Array.isArray(topics) ? topics.join(',') : topics || '',
      searchInSearch: searchInSearch || ''


    }
  )
  try {
    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          benchStrength: Array.isArray(benchStrength) ? benchStrength.join(',') : benchStrength || '',
          limit: limit,
          offset: offset,
          judges: Array.isArray(judge) ? judge.join(',') : judge || '',
          court: Array.isArray(courts) ? courts.join(',') : courts || '',
          fts: '',
          acs: '',
          topical: '',
          or: or || '',
          and: and || '',
          benchTypeFullName: '',
          searchLawyerName: '',
          lawyerFlag: '',
          actName: Array.isArray(acts) ? acts.join(',') : acts || '',
          section: Array.isArray(section) ? section.join(',') : section || '',
          actSectionFlag: '',
          searchFlag: '',
          decision_period: '',
          fromDate: '',
          toDate: '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: searchFilter || '',
          case_result: Array.isArray(Case_Results) ? Case_Results.join(',') : Case_Results || '',
          nominal_app: Array.isArray(nominal_app) ? nominal_app.join(',') : nominal_app || '',
          nominal_res: Array.isArray(nominal_res) ? nominal_res.join(',') : nominal_res || '',
          year_decision: Array.isArray(Decision_Years) ? Decision_Years.join(',') : Decision_Years || '',
          topical: Array.isArray(topics) ? topics.join(',') : topics || '',
          searchInSearch: searchInSearch || ''


        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const verifyUser = async (username, useremail, usermobileNumber) => {
  try {
    const requestBody = {};
    if (username) {
      requestBody.username = username
    }
    if (useremail) {
      requestBody.email = useremail
    }
    if (usermobileNumber) {
      requestBody.mobno = usermobileNumber
    }

    const response = await axios.post(`${API_URL} /api/auth / public / verifyUser`,
      requestBody);
    console.log("response", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error in verifyUser:", error?.response?.data?.message);

    let errorMessage = "An unexpected error occurred"; // Default error message
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response); // Log full response to debug
        errorMessage = error.response.data?.message || JSON.stringify(error.response.data) || errorMessage;
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };

  }
}

export const getgeneratepdf = async (citationID) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL} /api/pdf / generate - pdf`, {
      params: {
        citationID: citationID,
        user: 'Dhiraj Shende',
        type: 'pdf'

      },
      headers: {
        Authorization: `Bearer ${token} `
      }
    }
    );
    // console.log("response", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error in verifyUser:", error?.response?.data?.message);

    let errorMessage = "An unexpected error occurred"; // Default error message
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response); // Log full response to debug
        errorMessage = error.response.data?.message || JSON.stringify(error.response.data) || errorMessage;
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };

  }
}
export const getdownloadpdf = async (filepath) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL} /api/pdf / download - pdf ? filePath = ` + encodeURIComponent(filepath), {

      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token} `,
        Accept: 'application/pdf',

      }
    }
    );
    console.log("response new", response);
    return { success: true, data: response };
  } catch (error) {
    console.log("Error in verifyUser:", error?.response?.data?.message);

    let errorMessage = "An unexpected error occurred"; // Default error message
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response); // Log full response to debug
        errorMessage = error.response.data?.message || JSON.stringify(error.response.data) || errorMessage;
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };

  }
}




export const registerUser = async (name, email, mobno, password, fullName, value, couponSerialNo, couponCode, checked) => {
  try {
    const requestBody = {}
    if (value === '1') {
      requestBody.username = name,
        requestBody.email = email,
        requestBody.password = password,
        requestBody.mobilePhoneCountryCode = '+91',
        requestBody.mobilePhoneNumber = mobno,
        requestBody.userRole = 'ROLE_USER',
        requestBody.productFullName = 'DemoCoupon',
        requestBody.fullName = fullName,
        requestBody.acceptTerms = true,
        requestBody.promoCode = '',
        requestBody.SEcode = '',
        requestBody.couponSerialNumber = '',
        requestBody.couponCode = ''
    }
    else {
      requestBody.username = name,
        requestBody.email = email,
        requestBody.password = password,
        requestBody.mobilePhoneCountryCode = '+91',
        requestBody.mobilePhoneNumber = mobno,
        requestBody.userRole = 'ROLE_USER',
        requestBody.couponSerialNumber = couponSerialNo,
        requestBody.couponCode = couponCode,
        requestBody.fullName = fullName,
        requestBody.acceptTerms = true,
        requestBody.promoCode = '',
        requestBody.SEcode = '',
        requestBody.couponSerialNumber = '',
        requestBody.couponCode = ''
    }
    console.log("register", requestBody);
    const response = await axios.post(`${API_URL} /api/auth / public / signup`,

      requestBody

    );
    return { success: true, data: response.data };
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response); // Log full response to debug
        errorMessage = error.response.data?.message || JSON.stringify(error.response.data) || errorMessage;
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }
    return { success: false, error: errorMessage };
  }
}
export const getDefaultArticle = async (limit, offset) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /article/default_article ? searchString=&articleKeywordSearch=& articleTitleSearch=& articleAuthorSearch=& limit=` + limit + ` & offset=` + offset + ` & articleCategorySearch=`);
  try {
    const response = await axios.get(`${API_URL}/article/default_article`,
      {
        params: {
          searchString: '',
          articleKeywordSearch: '',
          articleTitleSearch: '',
          articleAuthorSearch: '',
          limit: limit,
          offset: offset,
          articleCategorySearch: ''
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      });


    return response.data;
  } catch (error) {
    console.log("error", error.response.status)
    if (error.response.status === 401) {

      // logout();
    }
    else if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getArticleDetails = async (articleID) => {
  console.log(`${API_URL} /article/full_article ? articleID = ` + articleID);
  try {
    const response = await axios.get(`${API_URL}/article/full_article ? articleID = ` + articleID)
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }

}
export const getArticleSearch = async (string) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /article/search_articleTitle ? articleTitle = ` + string);
  try {
    const response = await axios.get(`${API_URL}/article/search_articleTitle`,
      {
        params: {
          articleTitle: string
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      });



    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getArticleAuthorSearch = async (string) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /article/search_articleAuthor ? articleAuthor = ` + string);
  try {
    const response = await axios.get(`${API_URL}/article/search_articleAuthor`,
      {
        params: {
          articleAuthor: string
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}


export const getArticleKeywordSearch = async (string) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /article/search_articleKeywords ? articleKeywords = ` + string);
  try {
    const response = await axios.get(`${API_URL}/article/search_articleKeywords`,
      {
        params: {
          articleKeywords: string
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })


    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}
export const getActList = async (limit, offset, searchString) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  console.log(`${API_URL} /act/act_list ? searchString = ` + searchString + ` & limit=` + limit + ` & offset=` + offset);
  try {
    const response = await axios.get(`${API_URL}/act/act_list`,
      {
        params: {
          searchString: searchString,
          limit: limit,
          offset: offset
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      }
    )
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getSectionDetails = async (actName, actId) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/act/section_list`,
      {
        params: {
          actName: actName,
          actID: actId || ''
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }

}
export const getApi = async (searchString) => {

  console.log(`${API_URL} /article/search_article ? searching = ` + searchString);
  try {
    const response = await axios.get(`${API_URL}/article/search_article ? searching = ` + searchString)
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }

}

export const getArticleDigestDetails = async (searchString, SearchInput, limit, offset) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  const requestBody = {}

  if (SearchInput === 'Article Title') {
    requestBody.articleTitleSearch = 'articleTitleSearch';
    requestBody.articleAuthorSearch = '';
    requestBody.articleCategorySearch = '';
    requestBody.articleKeywordSearch = '';
  } else if (SearchInput === 'Article Author') {
    requestBody.articleAuthorSearch = 'articleAuthorSearch';

    requestBody.articleTitleSearch = '';
    requestBody.articleAuthorSearch = 'articleAuthorSearch';
    requestBody.articleCategorySearch = '';
    requestBody.articleKeywordSearch = '';

  }
  else if (SearchInput === 'Article Category') {

    requestBody.articleTitleSearch = '';
    requestBody.articleAuthorSearch = '';
    requestBody.articleCategorySearch = 'articleCategorySearch';
    requestBody.articleKeywordSearch = '';
  }
  else if (SearchInput === 'Article Keywords') {

    requestBody.articleTitleSearch = '';
    requestBody.articleAuthorSearch = '';
    requestBody.articleCategorySearch = '';
    requestBody.articleKeywordSearch = 'articleKeywordSearch';
  }

  console.log("params",
    {
      ...requestBody,
      searchString,
      limit: limit,
      offset: offset
    }
  )

  try {
    const response = await axios.get(`${API_URL}/article/default_article`,
      {
        params: {
          ...requestBody,
          searchString: searchString,
          limit: limit,
          offset: offset
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occured';
    }
    throw 'An unexpected error occured';

  }
}
export const getQueryApi = async (searchString, limit, offset) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  try {
    const response = await axios.get(`${API_URL}/article/search_fullText`,
      {
        params: {
          searchString: searchString,
          limit: limit,
          offset: offset
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occured';
    }
    throw 'An unexpected error occured';

  }

}
export const getActSectionDetails = async (sectionList, actName, searchFlag, limit, offset, courts, judges, benchStrength, Case_Results, Decision_Years, nominal_app, nominal_res, topics, searchFilter, searchInSearch) => {
  console.log("getActSectionDetails", `${API_URL}/digestView/digest ? section = ` + sectionList + ` & limit=` + limit + ` & offset=` + offset + ` & judges=` + '' + ` & court=` + '' + ` & fts=` + '' + ` & acs=` + '' + ` & topical=` + '' + ` & or=` + '' + ` & and=` + '' + ` & benchTypeFullName=` + '' + ` & benchStrength=` + '' + ` & searchLawyerName=` + '' + ` & lawyerFlag=` + '' + ` & actName=` + actName + ` & actSectionFlag=` + '' + ` & searchFlag=` + searchFlag + ` & decision_period=` + '' + ` & fromDate=` + '' + ` & toDate=` + '' + ` & judgmentDateFlag=` + '' + ` & searchPhrase=` + '' + ` & sortOrder=` + '' + ` & proximitySearch=` + 0 + ` & fieldsSearch=` + '');
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }


  try {
    const response = await axios.get(`${API_URL}/digestView/digest`,
      {
        params: {
          benchStrength: benchStrength || '',
          limit: limit,
          offset: offset,
          judges: judges || '',
          court: courts || '',
          fts: '',
          acs: '',
          topical: '',
          or: '',
          and: '',
          benchTypeFullName: '',
          searchLawyerName: '',
          lawyerFlag: '',
          actName: actName,
          section: sectionList,

          actSectionFlag: 'actSectionFlag',
          searchFlag: searchFlag,
          decision_period: '',
          fromDate: '',
          toDate: '',
          judgmentDateFlag: '',
          searchPhrase: 'allWords',
          sortOrder: 'desc',
          proximitySearch: 0,
          fieldsSearch: 'Citation_Year',
          searchFilter: searchFilter || '',
          case_result: Case_Results || '',
          nominal_app: nominal_app || '',
          nominal_res: nominal_res || '',
          year_decision: Decision_Years || '',
          topical: topics || '',
          searchInSearch: searchInSearch || ''


        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })

    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/public/forgotPassword`,
      { email },
      // { headers: { "Content-Type": "application/json" } }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getOtp:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};

export const getSubmitOtp = async (email, otp) => {

  try {
    const response = await axios.post(`${API_URL}/api/auth/public/changePassword`,
      {
        email: email,
        otp: otp || '',

      },
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getOtp:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};
export const getResetPassword = async (email, password) => {

  try {
    const response = await axios.post(`${API_URL}/api/auth/public/changePassword`,
      {
        email: email,
        password: password,

      },
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getOtp:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};

export const getfolderDefault = async (userDataTypeId) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get(`${API_URL}/bookmarks/getUserDataFolders`,
      {
        params: {
          userDataTypeId: userDataTypeId,
        },
        headers:{
          Authorization:`Bearer ${token}`
        }
      },
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getOtp:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};

export const getcreateFolder = async (folderName,folderType,parentDocumentId,isStaticContent) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.post(`${API_URL}/bookmarks/addUserDataFolder`,
      {
        
          folderName: folderName,
          folderType: folderType,
          parentDocumentId: parentDocumentId,
          isStaticContent: isStaticContent,
        },
        {
        headers:{
          Authorization:`Bearer ${token}`
        }
      },
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getOtp:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};

export const getSubfolder = async (parentId,keyWord) => {

  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.post(`${API_URL}/bookmarks/getUserFolderDataByParentId`,
      {
       
          parentId: parentId,
          keyWord:keyWord||''
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }

      },
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in get:", error);

    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error response:", error.response);
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        console.log("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("Request setup error:", error.message);
        errorMessage = error.message;
      }
    } else {
      console.log("Unknown error:", error);
    }

    return { success: false, error: errorMessage };
  }
};





