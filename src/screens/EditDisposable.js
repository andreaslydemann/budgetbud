import React, {Component} from 'react';
import {Container, Label} from 'native-base';
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import DisposableForm from "../components/DisposableForm";

class EditDisposable extends Component {
    onContinuePress = () => {
        this.props.navigation.navigate('DisposablePreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Rådighedsbeløb'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DisposableForm categoryItems={this.props.disposable}
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

const mapStateToProps = ({disposable}) => {
    return {disposable} = disposable;
};

export default connect(mapStateToProps, null)(EditDisposable);
