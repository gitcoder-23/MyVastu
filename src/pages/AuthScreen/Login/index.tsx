import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { COLORS } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { AssetImages } from '../../../constants/assetImages';
import PhoneInput, {
  ICountry,
  IPhoneInputRef,
} from 'react-native-international-phone-number';
import { loginValidator } from './loginValidator';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { LoginAction } from '../../../app/redux/actions/authAction';
import { AuthResponseModel } from '../../../app/redux/models/authModel';
import { styles } from './styles';

const LoginScreen = () => {
  const phoneInputRef = useRef<IPhoneInputRef>(null);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { isLoginLoading } = useAppSelector(state => state.authApp);

  const [showPassword, setShowPassword] = useState(false);
  const [loginInputState, setLoginInputState] = useState({
    email: '',
    mobile: '',
    password: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

  const handlePhoneChange = (value: string) => {
    setLoginInputState({ ...loginInputState, mobile: value });
  };
  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const onGoRegister = () => {
    Keyboard.dismiss();
    navigation.navigate('Register');
  };

  const onLogin = () => {
    const isValid = loginValidator(
      loginInputState,
      selectedCountry,
      phoneInputRef.current,
    );
    if (!isValid) {
      return;
    }

    const callingCode = selectedCountry?.idd?.root;
    const phoneNumber = loginInputState.mobile.replace(/\s+/g, '');
    const postLogin = {
      email: loginInputState.email.trim(),
      mobile: callingCode + phoneNumber,
      password: loginInputState.password.trim(),
    };
    dispatch(LoginAction(postLogin) as any)
      .unwrap()
      .then((res: AuthResponseModel) => {
        console.log('LoginResponse=>', res);
        Alert.alert(
          `Hi ${res.data?.user?.name || 'User'}`,
          res.message || 'Login Successful',
        );
        setLoginInputState({ email: '', mobile: '', password: '' });
        setShowPassword(false);
      })
      .catch((err: AuthResponseModel) => {
        console.log('LoginError=>', err);
        Alert.alert(
          'Login Failed',
          err?.message || 'Something went wrong. Please try again.',
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={AssetImages.appLogo}
              style={styles.appLogo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to home</Text>
            <Text style={styles.subtitle}>Enter your details to continue</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Login to Account</Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.iconGrey}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={COLORS.lightGreyText}
                keyboardType="email-address"
                autoCapitalize="none"
                value={loginInputState.email}
                onChangeText={value =>
                  setLoginInputState({ ...loginInputState, email: value })
                }
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <PhoneInput
                ref={phoneInputRef}
                value={loginInputState.mobile}
                onChangeText={handlePhoneChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                placeholder="Mobile Number"
                defaultCountry="US"
                phoneInputStyles={{
                  container: styles.phoneContainer,
                  flagContainer: styles.flagContainer,
                  flag: styles.flag,
                  caret: styles.caret,
                  callingCode: styles.callingCode,
                  input: styles.phoneInput,
                }}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.iconGrey}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.lightGreyText}
                secureTextEntry={!showPassword}
                value={loginInputState.password}
                onChangeText={value =>
                  setLoginInputState({ ...loginInputState, password: value })
                }
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color={COLORS.primaryRed}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            {/* <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={isLoginLoading ? () => {} : onLogin}
              style={[styles.button, isLoginLoading ? { opacity: 0.5 } : null]}
            >
              <Text style={styles.buttonText}>
                {isLoginLoading ? 'Loading...' : 'LOGIN'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <TouchableOpacity onPress={onGoRegister} style={styles.footerLink}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.linkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
