import axios, { Axios } from 'axios';
const API_URL = "http://192.168.0.102:8085/aironline";
// const API_URL = "http://192.168.0.99:8080/aironline"; //testserver
// const API_URL = "http://128.127.49.63:8085/aironline"; //Conference

// const API_URL = "http://192.168.1.12:8085/aironline"; // arbitratiion

export const getJournal = async () => {
  try {
    const response = await axios.get(`${API_URL}/citation/journalName`)
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
  try {
    const response = await axios.get(`${API_URL}/citation/journalYear?journalName=` + journalName)

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
  try {
    const response = await axios.get(`${API_URL}/citation/publication/segment?journalName=` + journalName + `&journalYear=` + journalYear)

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
export const getJournalCourt = async (journalName, journalYear, journalSegmant) => {
  try {
    const response = await axios.get(`${API_URL}/citation/courtName?journalName=` + journalName + `&journalYear=` + journalYear + `&publicationSegment=` + journalSegmant)
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getJournalPage = async (journalName, journalYear, journalSegmant, journalCourt) => {
  try {
    const response = await axios.get(`${API_URL}/citation/pageNo?journalName=` + journalName + `&journalYear=` + journalYear + `&publicationSegment=` + journalSegmant + `&courtName=` + journalCourt)
    return response.data;
  } catch (error) {

    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';

  }
}
export const getCitation = async (journalName, journalYear, journalSegmant, journalCourt, journalPage) => {
  try {
    const response = await axios.get(`${API_URL}/citation/citationList?journalName=` + journalName + `&journalYear=` + journalYear + `&publicationSegment=` + journalSegmant + `&courtName=` + journalCourt + `&pageNumber=` + journalPage)

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
  try {
    const response = await axios.get(`${API_URL}/api/judgement?citationID=` + citationID)

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
  try {
    console.log("courtName", courtName);
    var url = `${API_URL}/court/courtNamelist?searchCourtName=`;
    if (courtName === undefined) {
      url += "";
      console.log("url 1", url);
    } else {
      url += courtName
      console.log("url 2", url);
    }

    const response = await axios.get(url)

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

  console.log(`${API_URL}/digestView/digest?court=` + courtNameList + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=` + ''+`&benchTypeFullName=`+'');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest?court=` + courtNameList + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=` + ''+`&benchTypeFullName=`+'');
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
  try {
    const response = await axios.get(`${API_URL}/nominal/nominalList?nominalSearch=` + nominalSearch + `&courtName=` + courtName + `&searchString=` + searchString + `&limit=10&offset=` + page)
    console.log("API", `${API_URL}/nominal/nominalList?nominalSearch=` + nominalSearch + `&courtName=` + courtName + `&searchString=` + searchString + `&limit=10&offset=` + page);
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
  try {
    const response = await axios.get(`${API_URL}/lawyer/lawyername?searchLawyerName=` + lawyerName + `&limit=10&offset=` + page)
    console.log("API", `${API_URL}/lawyer/lawyername?searchLawyerName=` + lawyerName + `&limit=10&offset=` + page);
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
  try {
    const response = await axios.get(`${API_URL}/benchstrength/benchName`);
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

export const getJudgementDateDetails = async (decision_period, fromDate, toDate, limit, page) => {
  try {
    const response = await axios.get(`${API_URL}/judgmentDate/searchJudgmentDate?decision_period=` + decision_period + `&fromDate=` + fromDate + `&toDate=` + toDate + `&limit=10&offset=` + page);
    console.log("API", `${API_URL}/judgmentDate/searchJudgmentDate?decision_period=` + decision_period + `&fromDate=` + fromDate + `&toDate=` + toDate + `&limit=10&offset=` + page);
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }

}

export const getBenchStrengthDetails = async (benchStrength, limit, offset) => {
  console.log("getBenchStrengthDetails", `${API_URL}/digestView/digest?benchStrength=` + benchStrength + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&court=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=`+'' + `&benchTypeFullName=`+'');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest?benchStrength=` + benchStrength + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&court=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=` +''+ `&benchTypeFullName=`+'');
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getFTSDigestView = async (fts, limit, offset) => {

  console.log(`${API_URL}/digestView/digest?fts=` + fts + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&court=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=` + ''+ `&benchTypeFullName=`+'');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest?fts=` + fts + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&court=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + ''+ `&and=` + ''+ `&benchTypeFullName=`+'');
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

  console.log(`${API_URL}/digestView/digest?topical=` + searchword + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&court=` + '' + `&acs=` + '' + `&fts=` + ''+ `&or=` + ''+ `&and=` + ''+ `&benchTypeFullName=`+'');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest?topical=` + searchword + `&limit=` + limit + `&offset=` + offset + `&judges=` + '' + `&benchStrength=` + '' + `&court=` + '' + `&acs=` + '' + `&fts=` + ''+ `&or=` + ''+ `&and=` + ''+ `&benchTypeFullName=`+'');
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
  console.log(`${API_URL}/topic/topicname?searchTopic=` + topic );
  try {
    const response = await axios.get(`${API_URL}/topic/topicname?searchTopic=` + topic );
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const RegisterApi = async (name,email,mobno,password,fullname) => {
  console.log(`${API_URL}/opi/users/registration?username=`+name+
`&password=`+password+
`&email=`+email+
`&fullName=`+fullname+
`&mobileNumber=`+mobno+
`&countryCode=`+91);
  try {
    const response = await axios.get(`${API_URL}/opi/users/registration?username=`+name+
`&password=`+password+
`&email=`+email+
`&fullName=`+fullname+
`&mobileNumber=`+mobno+
`&countryCode=`+91);
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
  console.log(`${API_URL}/judge/judgeNameList?searchJudgeName=` + name );
  try {
    const response = await axios.get(`${API_URL}/judge/judgeNameList?searchJudgeName=` + name );
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

export const getJudgeDetails = async (judgesList, and,or,limit, offset) => {
  console.log("getJudgeDetails", `${API_URL}/digestView/digest?judges=` + judgesList + `&limit=` + limit + `&offset=` + offset + `&court=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + or+ `&and=`+and + `&benchTypeFullName=`+''+`&benchStrength=`+'');
  try {
    const response = await axios.get(`${API_URL}/digestView/digest?judges=` + judgesList + `&limit=` + limit + `&offset=` + offset + `&court=` + '' + `&fts=` + '' + `&acs=` + '' + `&topical=` + ''+ `&or=` + or+ `&and=`+and + `&benchTypeFullName=`+''+`&benchStrength=`+'');
    return response.data;
  } catch (error) {
    console.log("error", error)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
}

