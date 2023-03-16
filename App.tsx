import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import StackNavigator from './src/navigation';
import {setupPlayer} from './src/utils/helper/mediaPlayer.helper';

const App = () => {
  useEffect(() => {
    setupPlayer();
  }, []);

  return <StackNavigator />;
};

export default App;
