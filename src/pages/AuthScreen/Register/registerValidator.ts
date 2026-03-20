import { Alert } from 'react-native';
import { ICountry, IPhoneInputRef } from 'react-native-international-phone-number';
import { validEmailPatternRx } from '../../../utils/functions';

export const registerValidator = (registerInputState: any, selectedCountry: null | ICountry, phoneInputRef: IPhoneInputRef | null): boolean => {
    if (registerInputState.name.trim().length < 2) {
        Alert.alert(
            'Invalid Name',
            'Please enter your full name. Name should be at least 2 characters long.',
        );
        return false;
    }
    if (!validEmailPatternRx.test(registerInputState.email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return false;
    }

    if (!selectedCountry) {
        Alert.alert('Missing Country', 'Please select your country.');
        return false;
    }
    if (!registerInputState.mobile.trim()) {
        Alert.alert('Invalid Mobile', 'Please enter a valid mobile number.');
        return false;
    }

    if (!phoneInputRef?.isValid) {
        Alert.alert(
            'Invalid Phone Number',
            'Please enter a valid phone number based one the country code.',
        );
        return false;
    }

    if (registerInputState.password.trim().length < 6) {
        Alert.alert(
            'Invalid Password',
            'Password must be at least 8 characters long.',
        );
        return false;
    }

    if (registerInputState.confirmPassword.trim().length < 6) {
        Alert.alert(
            'Invalid Confirm Password',
            'Confirm Password must be at least 8 characters long.',
        );
        return false;
    }

    if (registerInputState.password !== registerInputState.confirmPassword) {
        Alert.alert(
            'Passwords Do Not Match',
            'The passwords you entered do not match. Please try again.',
        );
        return false;
    }
    return true;
};