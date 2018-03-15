import React, {Component} from "react";
import {Image, View, Platform, Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";
import {Content, Text, List, ListItem, Icon, Container, Left} from "native-base";
import {connect} from "react-redux";
import {signOut, screenChanged} from "../actions";

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
    navigate = (route) => {
        if (route === "SignOut") {
            this.props.signOut(() => {
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({
                        routeName: "SignIn"
                    })]
                }));
            });
        }

        if (route !== this.props.currentRoute) {
            this.props.screenChanged(route, () => {
                this.props.navigation.navigate(route)
            });
        }
    };

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
                                onPress={() => this.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{color: "#777", fontSize: 26, width: 30, marginLeft: 5}}
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
        backgroundColor: '#002940'
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

const mapStateToProps = ({nav}) => {
    return {currentRoute} = nav;
};

export default connect(mapStateToProps, {signOut, screenChanged})(SideBar);
