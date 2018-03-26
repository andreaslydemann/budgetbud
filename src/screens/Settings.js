import React, {Component} from 'react';
import {Container, Content, List, ListItem, Label, Body, Left, Right, Icon} from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import {deleteBudget} from "../actions/budget_actions";
import ConfirmDialog from "../components/ConfirmDialog";

class Settings extends Component {
    deleteBudget = () => {
        const {budgetID} = this.props;
        this.props.deleteBudget({budgetID}, () => {
            this.props.navigation.navigate('CreateBudget');
        });
    };

    render() {
        return (
            <Container>
                <ConfirmDialog
                    title="Bekræft sletning"
                    text="Vil du slette dit budget?"
                    confirmCallback={() => this.deleteBudget()}
                    loading={this.props.loading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={'Indstillinger'}
                               onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                    <Content>
                        <List>
                            <ListItem icon onPress={() => this.props.navigation.navigate("UserDetails")}>
                                <Left>
                                    <Icon name="md-person"/>
                                </Left>
                                <Body>
                                <Label>Brugeroplysninger</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="md-card"/>
                                </Left>
                                <Body>
                                <Label>Konti</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="md-notifications-outline"/>
                                </Left>
                                <Body>
                                <Label>Alarmer</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.confirmDialog.showDialog()}>
                                <Left>
                                    <Icon name="md-trash"/>
                                </Left>
                                <Body>
                                <Label>Slet budget</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    const {budgetID} = budget;
    return {budgetID}
};

export default connect(mapStateToProps, {
    deleteBudget
})(Settings);
