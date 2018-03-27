import React, {Component} from 'react';
import {Container, Content, Button, Text} from "native-base";
import {connect} from "react-redux";
import AppHeader from "../components/AppHeader";
import Separator from '../components/Separator';
import {createDebt} from "../actions";
import I18n from "../strings/i18n";

class DebtPreview extends Component {
    onSavePress = () => {
        this.props.createDebt(this.props, () => {
            this.props.navigation.pop(2);
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('debtPreviewHeader')}

                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>

                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={styles.buttonStyle}
                >
                    <Text style={styles.itemStyle}>
                        {I18n.t('debtPreviewSaveButton')}
                    </Text>
                </Button>
            </Container>
        );
    }
}

const styles = {
    buttonStyle: {
        width: '90%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white'
    }
};

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedCategories} = state.debt;
    return {name, amount, expirationDate, selectedCategories, budgetID};
};

const mapDispatchToProps = {
    createDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtPreview);
