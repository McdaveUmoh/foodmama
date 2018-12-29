import React from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';

export default class MenuButton extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress }
        style={styles.btnClickContain} underlayColor="rgba(128, 128, 128, 0.1)">
        <View style={styles.btnContainer}>
          <Image
            source={this.props.source}
            style={styles.btnIcon}
          />
          <Text style={styles.btnText}>
            {this.props.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontFamily: 'FallingSkyCond',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  }
})