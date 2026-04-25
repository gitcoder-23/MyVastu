import React, { useState } from 'react';
import {
  StyleSheet,
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

  const onGoLogin = () => {
    navigation.navigate('Login');
  };

  const onRegister = () => {
    // 1. Basic Empty Field Validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields to create your account.',
      );
      return;
    }

    // 2. Name Length Validation
    if (name.trim().length < 2) {
      Alert.alert('Invalid Name', 'Please enter your full name.');
      return;
    }

    // 3. Email Format Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address for your Vastu updates.',
      );
      return;
    }

    // 4. Password Strength Validation
    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'For security, your password must be at least 6 characters long.',
      );
      return;
    }

    // 5. Password Matching Validation
    if (password !== confirmPassword) {
      Alert.alert(
        'Passwords Mismatch',
        'Your password and confirm password do not match. Please check again.',
      );
      return;
    }

    setEmail('');
    setPassword('');
    setShowPassword(false);
    navigation.replace('Dashboard');
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
