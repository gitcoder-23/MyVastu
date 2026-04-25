import React, { useState, useRef } from 'react';
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
import { CustomToastAlert } from '../../../common/CustomToastAlert';

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

  // Logic checks for UI rules
  const password = registerInputState.password;
  const hasEightChars = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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
    Keyboard.dismiss();
    const isValid = registerValidator(
      registerInputState,
      selectedCountry,
      phoneInputRef.current,
    );
    if (!isValid) return;

    const callingCode = selectedCountry?.idd?.root;
    const phoneNumber = registerInputState.mobile.replace(/\s+/g, '');
    const postRegister = {
      name: registerInputState.name.trim(),
      email: registerInputState.email.trim(),
      mobile: callingCode + phoneNumber,
      password: registerInputState.password.trim(),
    };

    dispatch(RegisterAction(postRegister) as any)
      .unwrap()
      .then((res: AuthResponseModel) => {
        CustomToastAlert('success', 'Success!', 'Registration Successful');
        setRegisterInputState({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
        });
        navigation.navigate('Login');

        // Alert.alert(
        //   `Hi ${res.data?.user?.name || 'User'}`,
        //   res.message || 'Registration Successful',
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         setRegisterInputState({
        //           name: '',
        //           email: '',
        //           mobile: '',
        //           password: '',
        //           confirmPassword: '',
        //         });
        //         navigation.navigate('Login');
        //       },
        //     },
        //   ],
        //   { cancelable: false },
        // );
      })
      .catch((err: any) => {
        Alert.alert(
          'Registration Failed',
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
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

            {/* Name Input */}
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
                value={registerInputState.email}
                onChangeText={text =>
                  setRegisterInputState({
                    ...registerInputState,
                    email: text,
                  })
                }
              />
            </View>

            {/* Phone Input */}
            <View style={styles.phoneInputWrapper}>
              <PhoneInput
                ref={phoneInputRef}
                value={registerInputState.mobile}
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
                value={registerInputState.password}
                textContentType="oneTimeCode" // Prevents iOS Yellow Autofill
                autoComplete="off"
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

            {/* Confirm Password Input */}
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
                textContentType="oneTimeCode" // Prevents iOS Yellow Autofill
                autoComplete="off"
                onChangeText={text =>
                  setRegisterInputState({
                    ...registerInputState,
                    confirmPassword: text,
                  })
                }
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color={COLORS.primaryRed}
                />
              </TouchableOpacity>
            </View>

            {/* Password Validation Rules */}
            <View style={styles.rulesContainer}>
              <Text style={styles.rulesTitle}>Password must contain:</Text>

              {/* 8 Characters Rule */}
              <View style={styles.ruleItem}>
                <Ionicons
                  name={hasEightChars ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={
                    hasEightChars ? COLORS.successGreen : COLORS.lightGreyText
                  }
                />
                <Text
                  style={[styles.ruleText, hasEightChars && styles.ruleActive]}
                >
                  At least 8 characters
                </Text>
              </View>

              {/* Uppercase Rule */}
              <View style={styles.ruleItem}>
                <Ionicons
                  name={hasUppercase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={
                    hasUppercase ? COLORS.successGreen : COLORS.lightGreyText
                  }
                />
                <Text
                  style={[styles.ruleText, hasUppercase && styles.ruleActive]}
                >
                  One uppercase letter
                </Text>
              </View>

              {/* Number Rule */}
              <View style={styles.ruleItem}>
                <Ionicons
                  name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasNumber ? COLORS.successGreen : COLORS.lightGreyText}
                />
                <Text style={[styles.ruleText, hasNumber && styles.ruleActive]}>
                  At least one number
                </Text>
              </View>

              {/* Special Character Rule */}
              <View style={styles.ruleItem}>
                <Ionicons
                  name={hasSpecialChar ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={
                    hasSpecialChar ? COLORS.successGreen : COLORS.lightGreyText
                  }
                />
                <Text
                  style={[styles.ruleText, hasSpecialChar && styles.ruleActive]}
                >
                  One special character (e.g. @, #, $)
                </Text>
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              onPress={() => !isRegisterLoading && onRegister()}
              style={[
                styles.button,
                isRegisterLoading ? { opacity: 0.5 } : null,
              ]}
              disabled={isRegisterLoading}
            >
              <Text style={styles.buttonText}>
                {isRegisterLoading ? 'Loading...' : 'SIGN UP'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <TouchableOpacity onPress={onGoLogin} style={styles.footerLink}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
