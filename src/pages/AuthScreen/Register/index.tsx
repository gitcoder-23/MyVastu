import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { COLORS } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AssetImages } from '../../../constants/assetImages';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { RegisterAction } from '../../../app/redux/actions/authAction';
import PhoneInput, {
  ICountry,
  IPhoneInputRef,
} from 'react-native-international-phone-number';
import { registerValidator } from './registerValidator';
import { AuthResponseModel } from '../../../app/redux/models/authModel';
import { styles } from './styles';

const RegisterScreen = () => {
  const phoneInputRef = useRef<IPhoneInputRef>(null);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const { isRegisterLoading } = useAppSelector(state => state.authApp);
  const [registerInputState, setRegisterInputState] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneChange = (value: string) => {
    setRegisterInputState({ ...registerInputState, mobile: value });
  };
  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const onGoLogin = () => {
    navigation.navigate('Login');
  };

  const onRegister = () => {
    const isValid = registerValidator(
      registerInputState,
      selectedCountry,
      phoneInputRef.current,
    );
    if (!isValid) {
      return;
    }

    const callingCode = selectedCountry?.idd?.root;
    const phoneNumber = registerInputState.mobile.replace(/\s+/g, '');
    const postRegister = {
      name: registerInputState.name.trim(),
      email: registerInputState.email.trim(),
      mobile: callingCode + phoneNumber,
      password: registerInputState.password.trim(),
    };
    console.log('postRegister=>', postRegister);

    dispatch(RegisterAction(postRegister) as any)
      .unwrap()
      .then((res: AuthResponseModel) => {
        console.log('RegisterResponse=>', res);
        Alert.alert(
          `Hi ${res.data?.user?.name || 'User'}`,
          res.message || 'Registration Successful',
          [
            {
              text: 'OK',
              onPress: () => {
                setRegisterInputState({
                  name: '',
                  email: '',
                  mobile: '',
                  password: '',
                  confirmPassword: '',
                });
                setShowPassword(false);
                setShowConfirmPassword(false);
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false },
        );
      })
      .catch((err: any) => {
        console.log('RegisterError=>', err);
        Alert.alert(
          'Registration Failed',
          err?.message || 'Something went wrong. Please try again.',
        );
      });
  };

  console.log('isRegisterLoading==>', isRegisterLoading);

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={AssetImages.appLogo}
              style={styles.appLogo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Harmonizing your living space</Text>
          </View>
          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Create Account</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.iconGrey}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={COLORS.lightGreyText}
                value={registerInputState.name}
                onChangeText={text =>
                  setRegisterInputState({ ...registerInputState, name: text })
                }
              />
            </View>

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
                value={registerInputState.email}
                onChangeText={text =>
                  setRegisterInputState({ ...registerInputState, email: text })
                }
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <PhoneInput
                ref={phoneInputRef}
                value={registerInputState.mobile}
                onChangeText={handlePhoneChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                placeholder="Mobile Number"
                defaultCountry="IN"
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
                value={registerInputState.password}
                onChangeText={text =>
                  setRegisterInputState({
                    ...registerInputState,
                    password: text,
                  })
                }
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.primaryRed}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.iconGrey}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.lightGreyText}
                secureTextEntry={!showConfirmPassword}
                value={registerInputState.confirmPassword}
                onChangeText={text =>
                  setRegisterInputState({
                    ...registerInputState,
                    confirmPassword: text,
                  })
                }
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color={COLORS.primaryRed}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => !isRegisterLoading && onRegister()}
              // onPress={() => onRegister()}
              style={[
                styles.button,
                isRegisterLoading ? { opacity: 0.5 } : null,
              ]}
              disabled={isRegisterLoading}
            >
              <Text style={styles.buttonText}>
                {isRegisterLoading ? 'Loading...' : 'SIGN UP'}
                {/* SIGN UP */}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onGoLogin} style={styles.footerLink}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
