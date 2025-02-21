import React, { useEffect } from "react"
import { Text } from "react-native"
import { getActFullText } from "../api/api";

const BareActDetails = ({ navigation, route }) => {
    const { actName, actID } = route.params;

    useEffect(() => {
        bareActFullText()
    }, []);

    const bareActFullText = async () => {
        const response = await getActFullText(actName, actID);
        console.log(response.actData);
    }

   

    return (
        <Text></Text>
    )
}

export default BareActDetails;