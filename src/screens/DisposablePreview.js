import React, {Component} from 'react';
import {
    Container,
    Content,
    Button,
    Text
} from "native-base";
import {AppHeader, Separator}  from "../components/";
import {connect} from "react-redux";
import {button, text} from "../style/";
import {createDisposable} from "../actions";
import I18n from "../strings/i18n";

class DisposablePreview extends Component {
    onSavePress = () => {
        this.props.createDisposable(this.props, () => {
            this.props.navigation.pop(2);
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('disposablePreviewHeader')}

                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>

                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={button.defaultButton}
                >
                    <Text style={text.submitButtonText}>
                        {I18n.t('disposablePreviewSaveButton')}
                    </Text>
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedCategories} = state.disposable;
    return {name, amount, expirationDate, selectedCategories, budgetID};
};

const mapDispatchToProps = {
    createDisposable
};

export default connect(mapStateToProps, mapDispatchToProps)(DisposablePreview);
