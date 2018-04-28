import React, {Component} from "react";
import {Image, View} from "react-native";
import {connect} from "react-redux";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left
} from "native-base";
import I18n from "../../strings/i18n";
import {color, container, text} from '../../style/index';
import {screenChanged, signOut} from "../../redux/actions";

const elements = [
    {
        name: I18n.t('sideBarMyBudget'),
        route: "MyBudget",
        icon: "md-clipboard"
    },
    {
        name: I18n.t('sideBarExpenseOverview'),
        route: "ExpenseOverview",
        icon: "md-stats"
    },
    {
        name: I18n.t('sideBarSettings'),
        route: "Settings",
        icon: "md-options"
    },
    {
        name: I18n.t('sideBarSignOut'),
        route: "SignOut",
        icon: "md-exit"
    }
];

class SideBar extends Component {
    navigate = (route) => {
        const intro = "Intro";
        const introStack = "IntroStack";
        const signOut = "SignOut";
        const myBudget = "MyBudget";

        if (route === signOut)
            this.props.signOut();

        if (route === myBudget && this.props.initialRoute === introStack) {
            if (intro === this.props.currentRoute) return;

            if (introStack !== this.props.currentRoute) {
                this.props.screenChanged(introStack, () => {
                    this.props.navigation.navigate(introStack)
                });
            }

            return;
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
                    <View style={container.drawerCover}>
                        <Image square style={container.drawerImage}
                               source={require("../../../assets/drawer-image.png")}/>
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
                                        style={[color.lightIcon, {fontSize: 26, width: 30, marginLeft: 5}]}
                                    />
                                    <Text style={[text.sideBarText, color.text]}>
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

const mapStateToProps = (state) => {
    const {currentRoute} = state.nav;
    const {initialRoute} = state.init;

    return {currentRoute, initialRoute};
};

const mapDispatchToProps = {
    signOut, screenChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
