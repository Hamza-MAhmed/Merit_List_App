import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(370,250,130,1)', 'transparent']}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a' , '#3d3969']}
        // colors={['blue',]}        
        // style={styles.button}
        >
        {/* <Text style={styles.text}>Sign in with Facebook</Text> */}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    // flex:1
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});




