import { CommonActions } from "@react-navigation/native"; 

let _navigator;

function setTopLevelNavigator(navigatorRef){
    _navigator=navigatorRef;
}

function navigate(routeName,params={}){
    _navigator.dispatch(CommonActions.navigate({
        routeName,
        params
    }))
}

function goBack(){
    _navigator.dispatch(CommonActions.goBack());
}

export default {
    navigate,
    goBack,
    setTopLevelNavigator
}