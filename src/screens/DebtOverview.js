import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Content, Button, List, ListItem, Body, Right, Icon, Text} from 'native-base';
import Separator from '../components/Separator';
import {connect} from 'react-redux';
import {resetDebtForm} from "../actions/debt_actions";
import AppHeader from "../components/AppHeader";

class DebtOverview extends Component {
    onCreateDebtPress = () => {
        this.props.resetDebtForm(() => {
            this.props.navigation.navigate('CreateDebt');
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Gældsoversigt'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>
                    <List dataArray={this.props.debtItems}
                          renderRow={(item) =>
                              <ListItem>
                                  <Body>
                                  <Text>{item.name}</Text>
                                  <Text note>{item.value} kr</Text>
                                  </Body>
                                  <Right>
                                      <View style={{flexDirection: 'row'}}>
                                      <Icon style={{marginRight: 7, fontSize: 30}} name="md-create"/>
                                      <Icon style={{marginHorizontal: 7, fontSize: 30}} name="md-trash"/>
                                      </View>
                                  </Right>
                              </ListItem>
                          }>
                    </List>
                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onCreateDebtPress()}
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
    return {debtItems} = debt;
};

export default connect(mapStateToProps, {resetDebtForm})(DebtOverview);
