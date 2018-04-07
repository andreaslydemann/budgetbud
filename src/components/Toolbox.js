import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import {Button, Icon, Label, View} from "native-base";
import {button, text} from "../style/";
import I18n from "../strings/i18n";

export class Toolbox extends Component {
    showModal() {
        this.refs.bottomModal.open();
    }

    render() {
        return (
            <Modal position={"bottom"} ref={"bottomModal"}>
                <Label style={[text.defaultText, {
                    alignSelf: 'center',
                    marginTop: 5
                }]}>{I18n.t('myBudgetToolboxEdit')}</Label>

                <View style={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 40
                    }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigateUser("EditBudget")}
                        >
                            <View style={button.modalButton}>
                                <Icon name="md-clipboard"
                                      style={{color: "#1c313a"}}/>
                                <Label style={text.defaultText}>
                                    {I18n.t('myBudgetToolboxBudget')}
                                </Label>
                            </View>
                        </Button>

                        <Button
                            transparent
                            onPress={() => this.props.navigateUser("EditDisposable")}
                        >
                            <View style={button.modalButton}>
                                <Icon name="logo-usd" style={{color: "#1c313a"}}/>
                                <Label style={text.defaultText}>
                                    {I18n.t('myBudgetToolboxDisposable')}
                                </Label>
                            </View>
                        </Button>

                        <Button
                            transparent
                            onPress={() => this.props.navigateUser("DebtOverview")}
                        >
                            <View style={button.modalButton}>
                                <Icon name="ios-archive" style={{color: "#1c313a"}}/>
                                <Label style={text.defaultText}>
                                    {I18n.t('myBudgetToolboxDebt')}
                                </Label>
                            </View>
                        </Button>
                    </View>
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
