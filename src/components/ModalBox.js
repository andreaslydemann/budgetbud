import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import Modal from 'react-native-modalbox';
import {Button, Icon, Label, View} from "native-base";

class ModalBox extends Component {
    showModal() {
        this.refs.bottomModal.open();
    }

    render() {
        return (
            <Modal position={"bottom"} ref={"bottomModal"}>
                <Label style={[styles.textStyle, {
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
                        <View style={styles.modalButton}>
                            <Icon name="md-clipboard"
                                  style={{color: "#1c313a"}}/>
                            <Label style={styles.textStyle}>Budget</Label>
                        </View>
                    </Button>

                    <Button
                        transparent
                        onPress={() => this.props.navigateUser("EditDisposable")}
                    >
                        <View style={styles.modalButton}>
                            <Icon name="logo-usd" style={{color: "#1c313a"}}/>
                            <Label style={styles.textStyle}>Rådighedsbeløb</Label>
                        </View>
                    </Button>

                    <Button
                        transparent
                        onPress={() => this.props.navigateUser("DebtOverview")}
                    >
                        <View style={styles.modalButton}>
                            <Icon name="ios-archive" style={{color: "#1c313a"}}/>
                            <Label style={styles.textStyle}>Gæld</Label>
                        </View>
                    </Button>
                </View>
                <Button transparent
                        onPress={() => this.refs.bottomModal.close()}
                        style={styles.buttonStyle}
                >
                    <Icon name="ios-arrow-dropdown-circle"
                          style={{color: "#1c313a"}}/>
                </Button>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ModalBox;
