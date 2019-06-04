import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';



const instructions = Platform.select({
  ios: '',
  android: '',
});

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export default class Preferences extends Component {

    static navigationOptions = {
        title: 'Preferences'
       };


    constructor(props) {
     super(props);
     this.state = {
       loading: true,
       menuList:[],
       selectedMenuList:[],
       checked:[]
      };
    }
    componentDidMount(){
    fetch("http://192.168.171.249:8080/myapp/user/{1}")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          menuList: responseJson
        })
        console.log(responseJson)
      })
      .catch(error => console.log(error))
      }
    FlatListItemSeparator = () => {
    return (
      <View style={{
         height: .5,
         width:"100%",
         backgroundColor:"rgba(0,0,0,0.5)",
        }}
      />
    );
    }
    renderItem=(data)=>
    <TouchableOpacity style={styles.list}>
    <Text style={styles.lightText}>{data.item.food.name}</Text>
    <Text style={styles.lightText}>{data.item.food.type}</Text>
    </TouchableOpacity>

    renderHeader = () => {
      return <Header/>
    }

    render(){
      if(this.state.loading){
        return( 
          <View style={styles.loader}> 
            <ActivityIndicator size="large" color="#0c9"/>
          </View>
      )}
    return(
     <View style={styles.container}>
     <FlatList
        data= {this.state.menuList}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        renderItem= {item=> this.renderItem(item)}
        keyExtractor= {item=>item.foodId.toString()}
        extraData = {this.state}
        ListHeaderComponent = {this.renderHeader}
     />
    </View>
    )}
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff"
       },
      loader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
       },
      list:{
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
       }
    });