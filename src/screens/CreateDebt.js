import React, {Component} from 'react';
import {Container, Label} from 'native-base';
import AppHeader from "../components/AppHeader";
import DebtForm from '../components/DebtForm';
import {View} from 'react-native';
import {connect} from "react-redux";

class CreateDebt extends Component {
    onContinuePress = () => {
        this.props.navigation.navigate('DebtPreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Opret gæld'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DebtForm categoryItems={this.props.categoryItems}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

styles = {
    textContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginVertical: 25
    }
};

const mapStateToProps = ({debt}) => {
    return {categoryItems} = debt;
};

export default connect(mapStateToProps, null)(CreateDebt);
