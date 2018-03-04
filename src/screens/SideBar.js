import React, {Component} from "react";
import {Image, View, Platform, Dimensions} from "react-native";
import {Content, Text, List, ListItem, Icon, Container, Left} from "native-base";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const elements = [
    {
        name: "Mit budget",
        route: "MyBudget",
        icon: "md-clipboard"
    },
    {
        name: "Forbrugsoversigt",
        route: "SpendingOverview",
        icon: "md-stats"
    },
    {
        name: "Månedsrapporter",
        route: "MonthlyReports",
        icon: "md-calendar"
    },
    {
        name: "Kategorisér transaktioner",
        route: "CategorizeTransactions",
        icon: "md-list"
    },
    {
        name: "Indstillinger",
        route: "Settings",
        icon: "md-options"
    },
    {
        name: "Log ud",
        route: "SignOut",
        icon: "md-exit"
    }
];

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{flex: 1, backgroundColor: "#fff", top: -1}}
                >
                    <View style={styles.drawerCover}>
                        <Image square style={styles.drawerImage}
                               source={require("../../assets/drawer-image.png")}/>
                    </View>

                    <List
                        scrollEnabled={false}
                        dataArray={elements}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{color: "#777", fontSize: 26, width: 30}}
                                    />
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

styles = {
    drawerCover: {
        alignSelf: "stretch",
        height: deviceHeight / 7.5,
        width: null,
        position: "relative",
        marginBottom: 10,
        backgroundColor: '#455a64'
    },
    drawerImage: {
        position: "absolute",
        left: deviceWidth / 18,
        top: deviceHeight / 23,
        width: 204,
        height: 46
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    }
};

export default SideBar;
