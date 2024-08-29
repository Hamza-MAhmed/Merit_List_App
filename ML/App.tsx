import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SelectUniSc from "./components/SelectUni"
import Check from "./components/check"
import Merit from "./components/merit"
import AddMerit from "./components/AddMerit"
// const Stack = createStackNavigator();
type RootStackParamList = {
  Home: undefined;
  SelectUniSc: undefined;
  check: undefined;
  Merit: undefined;
  AddMerit: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SelectUniSc" component={SelectUniSc} />
        <Stack.Screen name="check" component={Check} />
        <Stack.Screen name="Merit" component={Merit} />
        <Stack.Screen name='AddMerit' component={AddMerit}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <Image
        style={styles.bgImage}
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbTuff6Do_nVNNKQc630XUhppNbDBBgX_YlMuY7Sss6yvuDjOiw4-rxLENBQsT8vo8MeY&usqp=CAU' }}
      />
      <View style={styles.welcome}>
      <Text style={{fontSize:40, color:"white"}}>Wel Come</Text>
      </View>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.Option}>
        <Button title='Check Merit' onPress={() => navigation.navigate('SelectUniSc')}></Button>
        <Button title='Add Merit' onPress={() => navigation.navigate('AddMerit')}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(250,200,100,0.7)',
    elevation: 30,
    
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  welcome: {
    flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin:100,
    fontSize:100
  },
  Option:{
    backgroundColor:"rgba(100,150,200,0.3)",
    elevation:0,
    flex:1,
    borderColor:"black",
    borderWidth:10,
    borderRadius:50,
    marginBottom:150,
    margin:40,
    padding:30,
    justifyContent:"space-around"

  }
});
