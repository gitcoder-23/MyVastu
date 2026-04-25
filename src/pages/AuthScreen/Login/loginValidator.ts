import { Alert } from 'react-native';
import { ICountry, IPhoneInputRef, isValidPhoneNumber } from 'react-native-international-phone-number';
import { validEmailPatternRx } from '../../../utils/functions';

export const loginValidator = (loginInputState: any, selectedCountry: null | ICountry, phoneInputRef: IPhoneInputRef | null): boolean => {
    if (!validEmailPatternRx.test(loginInputState.email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return false;
    }

    if (!selectedCountry) {
        Alert.alert('Missing Country', 'Please select your country.');
        return false;
    }
    if (!loginInputState.mobile.trim()) {
        Alert.alert('Invalid Mobile', 'Please enter a valid mobile number.');
        return false;
    }

    if (!isValidPhoneNumber(loginInputState.mobile, selectedCountry)) {
        Alert.alert(
            'Invalid Phone Number',
            'Please enter a valid phone number based on the country code.',
        );
        return false;
    }

    if (loginInputState.password.trim().length < 6) {
        Alert.alert(
            'Invalid Password',
            'Password must be at least 8 characters long.',
        );
        return false;
    }
    return true;
};