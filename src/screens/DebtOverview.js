import React, {Component} from 'react';
import {Container, Content, Button, List, ListItem, Left, Body, Right, Icon, Text} from 'native-base';
import {connect} from 'react-redux';
import AppHeader from "../components/AppHeader";

class DebtOverview extends Component {
    render() {
        return (
            <Container>
                <AppHeader headerText={'Gældsoversigt'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>
                <Content style={{flex: 4}}>
                    <List dataArray={this.props.debtList}
                          renderRow={(item) =>
                              <ListItem>
                                  <Body>
                                  <Text>{item.name}</Text>
                                  <Text note>{item.value} kr</Text>
                                  </Body>
                                  <Right>
                                      <Icon name="md-create"/>
                                      <Icon name="md-trash"/>
                                  </Right>
                              </ListItem>
                          }>
                    </List>
                </Content>
                <Button rounded
                        onPress={this.props.handleSubmit}
                        style={styles.buttonStyle}
                >
                    <Text style={styles.itemStyle}>Opret gæld</Text>

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

const mapStateToProps = ({debt}) => {
    return {debtList} = debt;
};

export default connect(mapStateToProps, {})(DebtOverview);
