import React, {Component} from 'react';
import {Container, Content, List, ListItem, Label, Body, Left, Right, Icon} from "native-base";
import AppHeader from "../components/AppHeader";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';

class Settings extends Component {
    render() {
        return (
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
                        <ListItem icon onPress={() => this.popupDialog.show()}>
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
                        <ListItem icon>
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

                <PopupDialog
                    width={0.8}
                    dialogTitle={<DialogTitle title="Hjælpeinformation"/>}
                    ref={(popupDialog) => {this.popupDialog = popupDialog}}
                    dismissOnTouchOutside={false}
                    actions={[
                        <DialogButton
                            buttonStyle={styles.dialogButton}
                            textContainerStyle={styles.dialogButtonTextContainer}
                            textStyle={styles.dialogButtonText}
                            text="Luk"
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />
                    ]}
                >
                    <Container style={styles.dialogContentView}>
                        <Label>{this.props.infoButtonText}</Label>
                    </Container>
                </PopupDialog>
            </Container>
        );
    }
}

export default Settings;
