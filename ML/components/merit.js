import React , {useState , useEffect} from 'react';
import { StyleSheet, View, Text, Button, ImageBackground,Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getMerit } from './apiService';


const yearData = [
    { label: '2024', value: '1' },
    { label: '2023', value: '2' },
    { label: '2022', value: '3' },
    { label: '2021', value: '4' },
    { label: '2020', value: '5' },
  ];

  
  
  const placeHolder = ["Select Department" , "Select Year"]

  const DropdownComponentYear = ({onSelect}) => {
    const [data , setData] = useState([])
  
    const [value, setValue] = useState(null);  
    
      return (
        <View style={styles.dropdownWrapper}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={yearData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);  
              onSelect(item.label)
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
          />
        </View>
      );
    };
    
const DropdownComponent = ({text , ddata , onSelect}) => {
  const [data , setData] = useState([])

  const [value, setValue] = useState(null);
  // if(text=='Select Department'){

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const depData = await getDep();
        const depData = ddata

        // Format the data as required by the Dropdown component
        if (depData && Array.isArray(depData)) {
          // Format the data as required by the Dropdown component
          const formattedData = depData.map(dep => ({
            label: dep.name, // Adjust based on the data structure
            value: dep._id   // Adjust based on the data structure
          }));
          setData(formattedData);
        } else {
          console.error('Invalid data format:', depData);
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
          placeholder={text}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value); 
            onSelect(item.value) 
          }}
          // onConfirmSelectItem={item => {
          //   getMerit(item.value)
          // }}

          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
      </View>
    );
  };

  const Animation = ({ targetValue }) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      if (targetValue === null || targetValue <= 0) return;
  
      const increment = () => {
        setCount(prevCount => {
          const nextCount = Math.min(prevCount + 1, targetValue);
          if (nextCount >= targetValue) clearInterval(intervalId);
          return nextCount;
        });
      };
  
      const intervalId = setInterval(increment, 10); // Adjust speed as needed
  
      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, [targetValue]);
  
    return (
      <View style={styles.showMerit}>
        <Text style={styles.meritText}>{count}</Text>
      </View>
    );
  };
  
  
  
const Merit = ({route}) => {
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(0)  
    const [selectedDep , setSelectedDep] = useState(null)
    const [selectedYear , setSelectedYear] = useState(null)
    const {departments} = route.params;   

    const handleDep = (depId) => {
      setSelectedDep(depId)
      // if(selectedYear && selectedDep){
      //   showMerit(selectedDep , selectedYear)
      // }
      // else{
      //   return
      // }
    }
    const handleYear = (year) => {
      setSelectedYear(year)
      // return
      // if (selectedDep&&selectedYear){
      //   showMerit(selectedDep , selectedYear)
      // }
      // else{
      //   return
      // }
    }

    const showMerit = async  (depId , year) => {
      const result = await getMerit(depId , year)
      setMax(result)
    }
    useEffect(() => {
      if (selectedDep && selectedYear) {
        showMerit(selectedDep , selectedYear)
      }
    }, [selectedDep, selectedYear]);
  
  return (
    
    <ImageBackground
      source={{uri : "https://lhr.nu.edu.pk/media/no_image.jpg"}} // Replace with your image path
      style={styles.background}
      resizeMode='contain'
    >
        <Image
        style={styles.bgImage}
        source={{ uri: 'https://img.freepik.com/free-vector/gradient-galaxy-background_23-2148991326.jpg' }}
        resizeMode='cover'
      />
    <View style={styles.container}>
        <DropdownComponent text={placeHolder[0]} ddata={departments} onSelect={handleDep}/>
        <DropdownComponentYear onSelect={handleYear}/>
        
          <Animation targetValue={max}/>
            {/* <Text style={styles.meritText}>{min}{"\n"}{max}</Text> */}
        

    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  container: {
    left:40,
    right:40,
    top:130,
    bottom: 130,
    position:'absolute',
    borderColor:'black',
    borderWidth:10,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent background color to ensure dropdown is visible
    elevation: 150,
     opacity:.8
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dropdownWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //  zIndex: 1, // Ensures dropdown is above the gradient
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical:20
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
    color:"white"
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
  showMerit:{
    flex:1,
     
    width: 270, // Adjust width as needed
    height: 270, // Adjust height to match width
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 135, // Half of width/height for perfect circle
    margin: 20,
     alignItems:"center",
    justifyContent:"center"
  },
  meritText : {
    position:'absolute',
    fontSize:100,
    color:'white',
    textAlign:'center',
    justifyContent:'space-around',
    // top: 1,
    paddingVertical:50,
    paddingTop:5,
    paddingEnd:5,
    paddingBottom:5
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity:0.5
    // flex: 1,
    // justifyContent: 'center',
  },
})

export default Merit;