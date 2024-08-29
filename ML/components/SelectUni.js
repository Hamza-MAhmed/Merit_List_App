
import React, { useState , useEffect } from 'react';
import { StyleSheet, View,Text, Dimensions, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { getUni } from './apiService';
import { sendSelectedValue } from './apiService';
const { width } = Dimensions.get('window'); // Get screen width

// const data = [
//   { label: 'Fast NUCES', value: '1' },
//   { label: 'NED University', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

const DropdownComponent = ({onSelect}) => {
  const [data , setData] = useState([])
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniData = await getUni();
        // Format the data as required by the Dropdown component
        if (uniData && Array.isArray(uniData)) {
          // Format the data as required by the Dropdown component
          const formattedData = uniData.map(uni => ({
            label: uni.name, // Adjust based on the data structure
            value: uni._id   // Adjust based on the data structure
          }));
          setData(formattedData);
        } else {
          console.error('Invalid data format:', uniData);
        }
      } catch (error) {
        console.error('Error fetching university data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on mount


  return (
    <View style={styles.dropdownWrapper}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select University"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          onSelect(item.value)
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    </View>
  );
};

const SelectUniSc = ({ navigation }) => {
  const [value , setValue] = useState(null)
  const handleSelect = (value) => {
    setValue(value)
  }
        const handleNextPress = async () => {
          if (value) {
            try {
              // Send the selected value to the backend
              const response = await sendSelectedValue(value);
              console.log('Backend response:', response);
      
              // Navigate to the next screen with the selected value
              // navigation.navigate('Merit', { value })
              navigation.navigate('Merit', { departments : response });
              ;
            } catch (error) {
              console.error('Error sending data to backend:', error);
            }
          } else {
            console.log('No value selected');
          }
            // props.navigation.navigate('Merit' , {value});
        };
        
  return (
    <View style={styles.container}>
        <Image
        style={styles.bgImage}
        source={{ uri: 'https://img.freepik.com/free-vector/gradient-galaxy-background_23-2148991326.jpg' }}
      />
      {/* Gradient Background */}
      {/* <LinearGradient
        colors={['rgba(370,250,130,0.8)', 'transparent']}
        style={styles.background}
      /> */}
      <View style={styles.dropdownContainer}>
        <DropdownComponent onSelect={handleSelect} />
      </View>
      {/* DropdownComponent */}
      <View style={styles.next}>
        <Button title="Next" onPress={handleNextPress} />
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'    
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     // Gradient will cover entire container
//   },
dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensures dropdown is above the background image
  },
  dropdownWrapper: {
    
    width: '100%',
    paddingHorizontal: 40,
//     Dropdown wrapper centered and above gradient
   },
  dropdown: {
    
    width: '100%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 5,
    backgroundColor: 'rgba(40,50,45,0.1)', // Semi-transparent background color to ensure dropdown is visible
    elevation: 50,
  },
  icon: {
    padding: 10,
    color:'white'
  },
  placeholderStyle: {
    fontSize: 20,
    color:'white'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 25,
    margin: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  next: {
    position: 'absolute',
    bottom: 90,
    right: 50,
    width: 100,
    zIndex: 2, // Ensures
  }
});

export default SelectUniSc;