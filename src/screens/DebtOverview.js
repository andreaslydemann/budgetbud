import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Container, Form} from "native-base";
import {connect} from 'react-redux';
import {deleteUser} from "../actions";

class DebtOverview extends Component {
    render() {
        return (
            <Container>
                <Form style={{flex: 4, alignItems: 'stretch'}}>
                    <FlatList
                        data={this.props.category}
                        extraData={this.props.categoryValue}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                        style={styles.listStyle}
                    />
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {loading} = auth;
};

export default connect(mapStateToProps, {
    deleteUser
})(DebtOverview);
