import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Import the dropdown component

// Sample data for dropdown menus
const uniData = [
  { label: 'Fast NUCES', value: '1' },
  { label: 'NED University', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const depData = [
  { label: 'Computer Science', value: 'CS' },
  { label: 'Electrical Engineering', value: 'EE' },
  { label: 'Mechanical Engineering', value: 'ME' },
  // Add more departments if needed
];

const SignUp = () => {
  const [uniName, setUniName] = useState(null);
  const [dep, setDep] = useState(null);
  const [ARN, setARN] = useState('');

  const onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={{ uri: 'https://t3.ftcdn.net/jpg/05/65/32/76/360_F_565327633_XgIZjMFQ0xZmsuPf4Vy8cdENvg9WSac8.jpg' }}
      />

      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={uniData}
          labelField="label"
          valueField="value"
          placeholder="Select University"
          value={uniName}
          onChange={item => setUniName(item.value)}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={depData}
          labelField="label"
          valueField="value"
          placeholder="Select Department"
          value={dep}
          onChange={item => setDep(item.value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="ARN"
          underlineColorAndroid="transparent"
          onChangeText={text => setARN(text)}
        />
        {/* <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/color/40/000000/password.png' }}
        /> */}
      </View>

      {/* <TouchableOpacity
        style={styles.btnByRegister}
        onPress={() => onClickListener('restore_password')}>
        <Text style={styles.textByRegister}>
          By registering on this App you confirm that you have read and accept our policy
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => onClickListener('Submit')}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onClickListener('sign up')}>
        <Text style={styles.btnText}>Have an account?</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
    marginTop:50
  },
//   btnByRegister: {
//     height: 15,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//     width: 300,
//     backgroundColor: 'transparent',
  //},
  loginButton: {
    // backgroundColor: '#00b5ec',
    backgroundColor:'transparent',
    borderWidth:10,
    borderColor:'#b3b3b3',
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    fontSize:25,
    color: '#b3b3b3',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textByRegister: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dropdownContainer: {
    width: 300,
    marginBottom: 20,
  },
  dropdown: {
    height: 45,
    borderColor: '#F5FCFF',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#BEBEBE',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SignUp;
