import React, {Component} from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   ActivityIndicator,
   FlatList,
   TouchableOpacity,
  AppRegistry,
  Image,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {List, ListItem} from 'react-native-elements';

export default class Menu extends Component {

  static navigationOptions = {
    title: 'Menu'
   };

    constructor(props) {
     super(props);
     this.state = {
       loading: true,
       menuList:[],
       selectedMenuList:[]
      };
    }

    press = (hey) => {
      this.state.menuList.map((item) => {
        if (item.foodId === hey.foodId) {
          item.check = !item.check
          if (item.check === true) {
            this.state.selectedMenuList.push(item);
            console.log('selected:' + item.name);
          } else if (item.check === false) {
            const i = this.state.selectedMenuList.indexOf(item)
            if (i != -1) {
              this.state.selectedMenuList.splice(i, 1)
              console.log('unselect:' + item.name)
              return this.state.selectedMenuList
            }
          }
        }
      })
      this.setState({menuList: this.state.menuList})
    }

    _showSelectedMenuList() {
      return this.state.selectedMenuList.length;
    }

    onPressDone = (selectedMenuList) => {
      console.log(selectedMenuList)
      fetch('http://192.168.171.249:8080/myapp/user/{1}', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data : this.state.selectedMenuList
        }),
      });
      this.props.navigation.navigate('Preferences')
    }
  
    componentDidMount() {
      const url = 'http://192.168.171.249:8080/myapp/food/';
      fetch(url).then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          menuList: responseJson
        })
        console.log(responseJson)
      })
      .catch(error => console.log(error))
      }
  
    renderHeader = () => {
      return <Header/>
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.storyContainer}>
            <FlatList data={this.state.menuList} keyExtractor={item => item.foodId} 
            extraData={this.state} 
            ListHeaderComponent={this.renderHeader} 
            renderItem={({item}) => {
              return <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ecf0f1'
              }} onPress={() => {
                this.press(item)
              }}>
                <View style={{
                  flex: 3,
                  alignItems: 'flex-start',
                  justifyContent: 'center'
                }}>
                  {item.check
                    ? (
                      <Text style={{
                        fontWeight: 'bold'
                      }}>{`${item.name} ${item.type}`}</Text>
                    )
                    : (
                      <Text>{`${item.name} ${item.type}`}</Text>
                    )}
                </View>
                <View style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}>
                  {item.check
                  ? (
                    <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                  )
                  : (
                    <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                  )}
                </View>
              </TouchableOpacity>
            }}/>
          </View>
          <View>
            {(this.state.selectedMenuList.length > 0)
              ? (
                <View style={styles.containerFooter}>
                  <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    alignContent: 'center'
                  }}>
                    <FlatList data={this.state.selectedMenuList} 
                    horizontal={true} 
                    extraData={this.state} 
                    keyExtractor={(item, index) => item.foodId} renderItem={({item, index}) => {
                      return <View style={{
                        paddingTop: 10
                      }}>
                        <Text style={{
                          color: 'white',
                          fontWeight: 'bold',
                          padding: 2
                        }}>{`${item.name},`}
                        </Text>
                      </View>
                    }}/>
  
                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}>
                    <TouchableOpacity style={{
                      padding: 10
                    }} onPress={() => Alert.alert('Message sent :)')}>
                      <Icon name="ios-paper-plane" size={30} color="white"></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              )
              : null
  }
          </View>
  
        </View>
      );
    };
  };
  
  const primaryColor = "#1abc9c";
  const lightGrey = "#ecf0f1";
  const darkGrey = "#bdc3c7";
  
  const Header = (props) => (
    <View style={styles.searchContainer}>
      <Text style={styles.input} >Menu</Text>
      <Button
        onPress={() => {
          this.onPressDone(this.state.selectedMenuList)
        }}
        title="Done"
        color="#841584"
      />
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 20,
      paddingBottom: 0
    },
    containerFooter: {
      height: 50,
      backgroundColor: '#1abc9c',
      padding: 5,
      flexDirection: 'row'
    },
    searchContainer: {
      flex: 1,
      padding: 5,
  
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ecf0f1'
    }
  });