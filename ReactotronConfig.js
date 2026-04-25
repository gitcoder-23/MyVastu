import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({ name: 'React Native App' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
