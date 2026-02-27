import React, { useState, useRef } from 'react';
import {
  StyleSheet,
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
import { AuthRegisterResponseModel } from '../../../app/redux/models/authModel';

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
    const postRegister = {
      name: registerInputState.name.trim(),
      email: registerInputState.email.trim(),
      mobile: phoneInputRef.current?.fullPhoneNumber.trim(),
      password: registerInputState.password.trim(),
    };
    dispatch(RegisterAction(postRegister) as any)
      .unwrap()
      .then((res: AuthRegisterResponseModel | any) => {
        Alert.alert(
          `Hi ${res.user?.name}`,
          res.message,
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
                navigation.replace('Login');
              },
            },
          ],
          { cancelable: false },
        );
      })
      .catch((err: AuthRegisterResponseModel | any) => {
        Alert.alert('Failed', err.message);
      });
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: COLORS.secondaryRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryRed,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.greyText,
    marginTop: 5,
  },
  formCard: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.primaryRed,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryBlack,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.primaryBlack,
    paddingRight: 10,
  },
  eyeButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primaryRed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.greyText,
    fontSize: 14,
  },
  linkBold: {
    color: COLORS.primaryRed,
    fontWeight: 'bold',
  },
  appLogo: {
    width: 180,
    marginBottom: 10,
    alignSelf: 'center',
  },

  // Phone
  phoneInputWrapper: {
    marginBottom: 16,
  },
  phoneContainer: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    height: 52,
  },
  flagContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
  },
  flag: {
    fontSize: 20,
  },
  caret: {
    display: 'none',
  },
  callingCode: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primaryBlack,
  },
  phoneInput: {
    fontSize: 15,
    color: COLORS.primaryBlack,
    fontWeight: '400',
    paddingLeft: 0,
  },
});
