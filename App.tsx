/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { AppInitializer } from './src/AppInitializer';
import { COLORS } from './src/constants/colors';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from './src/app/api/config';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.greenColor1 }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: COLORS.blackColor1,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

function App() {
  return (
    <>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <AppInitializer />
      </StripeProvider>
      <Toast config={toastConfig} />
    </>
  );
}
export default App;
