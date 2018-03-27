import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import {Button, Icon, Label, View} from "native-base";
import {button, text} from "../style/";

export class ModalBox extends Component {
    showModal() {
        this.refs.bottomModal.open();
    }

    render() {
        return (
            <Modal position={"bottom"} ref={"bottomModal"}>
                <Label style={[text.defaultText, {
                    alignSelf: 'center',
                    marginTop: 10
                }]}>Redigér:</Label>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 40,
                    marginHorizontal: 40
                }}>
                    <Button
                        transparent
                        onPress={() => this.props.navigateUser("EditBudget")}
                    >
                        <View style={button.modalButton}>
                            <Icon name="md-clipboard"
                                  style={{color: "#1c313a"}}/>
                            <Label style={text.defaultText}>Budget</Label>
                        </View>
                    </Button>

                    <Button
                        transparent
                        onPress={() => this.props.navigateUser("EditDisposable")}
                    >
                        <View style={button.modalButton}>
                            <Icon name="logo-usd" style={{color: "#1c313a"}}/>
                            <Label style={text.defaultText}>Rådighedsbeløb</Label>
                        </View>
                    </Button>

                    <Button
                        transparent
                        onPress={() => this.props.navigateUser("DebtOverview")}
                    >
                        <View style={button.modalButton}>
                            <Icon name="ios-archive" style={{color: "#1c313a"}}/>
                            <Label style={text.defaultText}>Gæld</Label>
                        </View>
                    </Button>
                </View>
                <Button transparent
                        onPress={() => this.refs.bottomModal.close()}
                        style={button.bottomRight}
                >
                    <Icon name="ios-arrow-dropdown-circle"
                          style={{color: "#1c313a"}}/>
                </Button>
            </Modal>
        )
    }
}