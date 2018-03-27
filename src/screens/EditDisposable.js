import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import I18n from "../strings/i18n";
import AppHeader from "../components/AppHeader";
import DisposableForm from "../components/DisposableForm";

class EditDisposable extends Component {
    onContinuePress = () => {
        this.props.navigation.navigate('DisposablePreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('editDisposableHeader')}
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
