// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import { ActivityIndicator, AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/app/redux/store';

import { name as appName } from './app.json';

const MyVastu = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => MyVastu);
