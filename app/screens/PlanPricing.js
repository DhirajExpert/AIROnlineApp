import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Background from "../components/Background";
import { theme } from "../core/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75; // Each card takes 85% width
const SPACING = 30; // Space between cards

const PlanPricing = () => {
    const [plans, setPlans] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = new Animated.Value(0);

    // Simulating API Call
    useEffect(() => {
        const fetchPlans = async () => {
            const apiData = Array.from({ length: 10 }, (_, i) => ({
                id: `${i + 1}`,
                name: `Plan ${i + 1}`,
                desc: `Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis mollis vulputate `,
                price: (i + 1) * 1000,
                features: [`Feature A${i}`, `Feature B${i}`, `Feature C${i}`],
            }));
            setPlans(apiData);
        };
        fetchPlans();
    }, []);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (CARD_WIDTH + SPACING));
        setActiveIndex(index);
    };

    // Function to determine dot states
    const getDots = () => {
        if (plans.length <= 3) return plans.map((_, i) => i);
        if (activeIndex <= 1) return [0, 1, 2];
        if (activeIndex >= plans.length - 2) return [plans.length - 3, plans.length - 2, plans.length - 1];
        return [activeIndex - 1, activeIndex, activeIndex + 1];
    };

    return (
        <Background>
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Ionicons name="wallet-outline" size={24} color="white" />
                <Text style={styles.title}>Plans & Pricing</Text>
                <TouchableOpacity>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={plans}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    snapToAlignment="center"
                    snapToInterval={CARD_WIDTH + SPACING}
                    decelerationRate="fast"
                    onScroll={handleScroll}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.planTitle}>{item.name}</Text>
                            <Text style={styles.price}>
                                ₹<Text style={styles.priceValue}>{item.price}</Text>/month
                            </Text>
                            <Text style={styles.desc}>{item.desc}</Text>
                            <View style={styles.featureList}>
                                {item.features.map((feature, index) => (
                                    <View style={styles.featureItem} key={index}>
                                        <View style={styles.bullet} />
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                />
            </View>


            {/* Pagination Dots (Only 3 Dots) */}
            <View style={styles.pagination}>
                {getDots().map((dotIndex, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            dotIndex === activeIndex ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

            
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>

            
            <View style={styles.footer}>
                <TouchableOpacity >
                    <Text style={styles.footerText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.footerText}>Help Center</Text>
                </TouchableOpacity>

            </View>

           
            
        </View>
        </Background>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#1a2a52",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "white",
        width: CARD_WIDTH,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
        alignItems: "center",
        marginRight: SPACING,
        borderWidth: 1,
        borderColor:theme.colors.red,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1a2a52",
    },
    price: {
        fontSize: 18,
        color: theme.colors.red,
        fontWeight: "bold",
        marginTop: 5,
    },
    priceValue: {
        fontSize: 22,
    },
    featureList: {
        marginTop: 10,
    },
    desc: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
    
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    bullet: {
        width: 8,
        height: 8,
        backgroundColor: "gray",
        borderRadius: 4,
        marginRight: 8,
    },
    featureText: {
        color: "gray",
    },
    selectButton: {
        backgroundColor: theme.colors.red,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignSelf: "center",
        marginTop: 15,
    },
    selectButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: theme.colors.red,
        width: 12,
        height: 12,
    },
    inactiveDot: {
        backgroundColor: "gray",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    footerText: {
        color: theme.colors.blue,
        marginHorizontal: 10,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1a2a52",
        paddingVertical: 15,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});

export default PlanPricing;
