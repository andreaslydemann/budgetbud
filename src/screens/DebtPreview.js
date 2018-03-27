import React, {Component} from 'react';
import {Container, Content, Button, Text} from "native-base";
import {AppHeader, Separator}  from "../components/";
import {connect} from "react-redux";
import {createDebt} from "../actions/debt_actions";
import {button, text} from "../style/";

class DebtPreview extends Component {
    onSavePress = () => {
        this.props.createDebt(this.props, () => {
            this.props.navigation.pop(2);
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Forhåndsvisning'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>

                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={button.defaultButton}
                >
                    <Text style={text.submitButtonText}>Gem</Text>
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedCategories} = state.debt;
    return {name, amount, expirationDate, selectedCategories, budgetID};
};

const mapDispatchToProps = {
    createDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtPreview);
