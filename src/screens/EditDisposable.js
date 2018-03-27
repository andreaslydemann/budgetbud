import React, {Component} from 'react';
import {Container} from 'native-base';
import {AppHeader, DisposableForm} from "../components/";
import {connect} from "react-redux";

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

const mapStateToProps = ({disposable}) => {
    return {disposable} = disposable;
};

export default connect(mapStateToProps, null)(EditDisposable);
