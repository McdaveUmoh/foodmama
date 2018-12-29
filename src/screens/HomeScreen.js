import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, Icon, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import AsyncImageAnimated from '../components/AsyncImageAnimated';
import firebase from 'react-native-firebase';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
  });



  constructor(props) {
    super(props);

    this.categoriesRef = firebase.firestore().collection('categories');
    this.dealsRef = firebase.firestore().collection('categories');
    this.foodsRef = firebase.firestore().collection('foods');
    this.categorieUnsubscribe = null;
    this.dealsUnsubscribe = null;
    this.foodsUnsubscribe = null;


    this.state = {
      activeSlide: 0,
      categories: [], 
      deals: [], 
      foods: [],
      loading: false,
      error: null,
      refreshing: false
    };
  }


  onCategoriesCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, description, photo, price } = doc.data();
      data.push({
        id: doc.id,
        name,
        description,
        photo,
        doc,
        price
      });
    });

    this.setState({
      categories: data,
      loading: false,
    });
  }

  onDealsCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, description, photo, price } = doc.data();
      data.push({
        id: doc.id,
        name,
        description,
        photo,
        doc,
        price
      });
    });

    this.setState({
      deals: data,
      loading: false,
    });
  }

  onFoodsCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, description, photo, price } = doc.data();
      data.push({
        id: doc.id,
        name,
        description,
        photo,
        doc,
        price
      });
    });

    this.setState({
      foods: data,
      loading: false,
    });
  }

  componentDidMount() {
    this.categorieUnsubscribe = this.categoriesRef.onSnapshot(this.onCategoriesCollectionUpdate)
    this.dealsUnsubscribe = this.dealsRef.onSnapshot(this.onDealsCollectionUpdate)
    this.foodsUnsubscribe = this.foodsRef.onSnapshot(this.onFoodsCollectionUpdate)
    var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
    });
    that.setState({
      //Setting the data source
      dataSource: items,
    });
  }

  componentWillUnmount() {
    this.categorieUnsubscribe();
    this.dealsUnsubscribe();
    this.foodsUnsubscribe();
  }


  renderItem({ item, index }) {
    return <View style={{
    flex: 1,
    margin: 5,
    minWidth: 170,
    maxWidth: 223,
    height: 304,
    maxHeight:304,
    }}/>
    }

  onPressCategoryItem = (item) => {
    this.props.navigation.navigate('FoodList', { item: item });
  }


  onPressFoodItem = (item) => {
    this.props.navigation.navigate('FoodDetail', { item: item });
  }

  renderCategoryItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.categoryItemPhoto} source={{ uri: item.photo }} />
        <Text style={styles.categoryItemTitle}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  renderFoodItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressFoodItem(item)}>
      <View style={styles.foodItemContainer}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.foodPhoto} source={{ uri: item.photo }} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderCategorySeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: "100%",
        }}
      />
    );
  };

  render() {
    const { activeSlide } = this.state;

    return (
      <ScrollView style={styles.container}>
        
        <View style={styles.foods}>
        <FlatList
          data={this.state.foods}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.onPressFoodItem(item)}>
              <View elevation={2} style={styles.foodItemContainer}>
                <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.foodPhoto} source={{ uri: item.photo }} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>${item.price}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )
        }
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  foods:{
    
  },
  foods1: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
  },
  foodItemContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 99
    },
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1.0

  },
  foodPhoto: {
    flex: 1,
    width: 170,
    height: 170,
  },
  foodInfo: {
    flex: 1,
    marginTop: 10,
    margin: 10,
    flexDirection: 'row',
  },
  foodName: {
    flex: 1,
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'left',
    color: AppStyles.color.text,
  },
  foodPrice: {
    flex: 1,
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'right',
    color: AppStyles.color.text,
  },
  title: {
    marginTop: 20,
    marginLeft: 5,
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.text,
    fontSize: 20,
  },
  photo: {
    flex: 1,
    height: 50,
  },
  detail: {
    flex: 1,
    height: 50,
    width: 50,
    marginRight: 10
  },

  description: {
    marginTop: 20,
    color: AppStyles.color.text,
  },
  buttonSetContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSet: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: AppStyles.borderRadius.main,
    borderColor: AppStyles.color.grey
  },
  count: {
    padding: 10,
    marginTop: 2,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    width: 50,
  },
  buttonText: {
    color: AppStyles.color.text
  },
  price: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: AppStyles.color.text,
    borderColor: AppStyles.color.grey,
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 50,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    color: AppStyles.color.white
  },



});