import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/main';
import Manage from './screens/manage';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { initDB } from './service/storeService'
import { useEffect } from 'react';

interface AppProps { }

const Stack = createStackNavigator();

const App: React.FC<AppProps> = () => {
  useEffect(() => {
    initDB();
  }, [])
  const styles: { statusBar: ViewStyle } = StyleSheet.create({
    statusBar: {
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
  });

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Tasks'
            component={Main}
            options={{
              headerStyle: styles.statusBar,
            }}
          />
          <Stack.Screen name='ManageTasks' component={Manage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;