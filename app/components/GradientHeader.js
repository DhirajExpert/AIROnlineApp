import React from "react";
import { View } from "react-native"
const GradientHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
        <LinearGradient
            colors={['red', 'blue']}
            style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
        >
            <Header {...props} />
        </LinearGradient>
    </View>
)