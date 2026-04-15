import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AppState,
  AppStateStatus,
} from 'react-native';
import { COLORS } from './constants/colors';
import { useAppDispatch, useAppSelector } from './app/redux/hooks';
import { setLogout } from './app/redux/slices/authAppSlice';
import { setSessionExpiredCallback } from './app/api/rootApi';

const SessionHandler = ({ children }: { children: React.ReactNode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { accessToken } = useAppSelector(state => state.authApp);
  const dispatch = useAppDispatch();

  // FIXED TYPE: Using ReturnType<typeof setInterval> or number handles both Node and Web environments
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    setSessionExpiredCallback(() => {
      setIsModalVisible(true);
    });

    return () => {
      setSessionExpiredCallback(() => {});
    };
  }, []);

  const handleLogout = () => {
    setIsModalVisible(false);
    dispatch(setLogout());
  };

  return (
    <View style={{ flex: 1 }}>
      {children}

      <Modal transparent visible={isModalVisible} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Session Expired</Text>
            <Text style={styles.message}>
              Your session has timed out. Please login again to continue.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.shadowBlack7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.shadowBlack8,
    marginBottom: 25,
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SessionHandler;
