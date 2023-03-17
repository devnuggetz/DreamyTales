import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import StackNavigator from './src/navigation';
import {setupPlayer} from './src/utils/helper/mediaPlayer.helper';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
