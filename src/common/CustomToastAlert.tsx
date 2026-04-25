import Toast from 'react-native-toast-message';

export const CustomToastAlert = (
  type: 'success' | 'error' | 'info',
  title?: string,
  message?: string,
  position?: 'top' | 'bottom',
) => {
  Toast.show({
    type: type ?? 'info',
    text1: title ?? '',
    text2: message ?? '',
    position: position ?? 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};
