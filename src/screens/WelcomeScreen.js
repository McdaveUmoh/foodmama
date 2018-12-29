import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import { ButtonStyle, TextStyle, AppStyles } from '../AppStyles';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
     header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />
        <Text style={TextStyle.title}> Welcome to Eats </Text>
        <Text style={TextStyle.content}> Check out our menus, order food and make reservations </Text>
        <Button containerStyle={ButtonStyle.loginContainer} style={ButtonStyle.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Log In
        </Button>
        <Button containerStyle={ButtonStyle.signupContainer} style={ButtonStyle.signupText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150
  },
  logo: {
    width: 200,
    height: 200,
    tintColor: AppStyles.color.main
  }
})

