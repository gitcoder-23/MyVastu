import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export const styles = StyleSheet.create({
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
    ////////
    rulesContainer: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 5,
    },
    rulesTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.greyText,
        marginBottom: 8,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ruleText: {
        fontSize: 12,
        color: COLORS.lightGreyText,
        marginLeft: 8,
    },
    ruleActive: {
        color: '#4CAF50', // Success green color
        fontWeight: '500',
    },
});
