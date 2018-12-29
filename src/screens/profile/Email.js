import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import mainColor from './constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: mainColor,
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
})

const Email = ({ containerStyle, email, index }) => (
  <TouchableOpacity>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        {+index === 0 && (
          <Icon
            name="people"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
          />
        )}
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>Gold</Text>
        </View>
        <View style={styles.emailNameColumn}>
          <Text>Membership</Text>
        </View>
      </View>
      <View style={styles.emailIcon}>
          <Text>61 Orders</Text>
          <Text>&nbsp;</Text>
      </View>
      <View style={styles.emailIcon}>
          <Text>&nbsp;&nbsp;</Text>
      </View>
    </View>
  </TouchableOpacity>
)


export default Email
