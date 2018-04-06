import React, {Component} from 'react';
import {Container} from "native-base";
import {Logo} from '../components';
import {container} from "../style";
import I18n from "../strings/i18n";

class Offline extends Component {
    render() {
        return (
            <Container style={container.signedOutContainer}>
                <Logo logoText={I18n.t('noConnection')}/>
            </Container>
        );
    }
}

export default Offline;
