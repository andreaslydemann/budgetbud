import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import {Button, Icon, Label, View} from "native-base";
import {button, text} from "../../style/index";
import I18n from "../../strings/i18n";
import {debounce} from "lodash";

export class Toolbox extends Component {
    showModal() {
        this.refs.bottomModal.open();
    }

    render() {
        return (
            <Modal position={"bottom"} ref={"bottomModal"}>
                <View style={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 40,
                        marginTop: 20

                    }}>
                        <Button
                            transparent
                            onPress={debounce(() => {
                                this.props.navigateUser("EditBudget");
                                this.refs.bottomModal.close();
                            }, 400)}

                        >
                            <View style={button.modalButton}>
                                <Icon name="md-clipboard"
                                      style={{color: "#00263A"}}/>
                                <Label style={text.defaultText}>
                                    {I18n.t('myBudgetToolboxBudget')}
                                </Label>
                            </View>
                        </Button>

                        <Button
                            transparent
                            onPress={debounce(() => {
                                this.props.navigateUser("EditDisposable");
                                this.refs.bottomModal.close();
                            }, 400)}
                        >
                            <View style={button.modalButton}>
                                <Icon name="logo-usd" style={{color: "#00263A"}}/>
                                <Label style={text.defaultText}>
                                    {I18n.t('myBudgetToolboxDisposable')}
                                </Label>
                            </View>
                        </Button>

                        <Button
                            transparent
                            onPress={debounce(() => {
                                this.props.navigateUser("DebtOverview");
                                this.refs.bottomModal.close();
                            }, 400)}
                        >
                            <View style={button.modalButton}>
                                <Icon name="ios-archive" style={{color: "#00263A"}}/>
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
                          style={{color: "#00263A"}}/>
                </Button>
            </Modal>
        )
    }
}
