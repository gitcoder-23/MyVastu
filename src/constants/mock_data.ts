import { ComponentProps } from "react";
import { COLORS } from "./colors";
import { Ionicons } from "@expo/vector-icons";


export interface MenuItem {
    id: number;
    title: string;
    icon: ComponentProps<typeof Ionicons>['name'];
    color: string;
}

export const dashboardMenuItems: MenuItem[] = [
    {
        id: 1,
        title: 'Home Search',
        icon: 'search-outline',
        color: COLORS.primaryRed,
    },
    {
        id: 2,
        title: 'About Us',
        icon: 'information-circle-outline',
        color: COLORS.primaryRed,
    },
    {
        id: 3,
        title: 'Contact Us',
        icon: 'call-outline',
        color: COLORS.primaryRed,
    },
    { id: 4, title: 'Privacy Policy', icon: 'lock-closed-outline', color: COLORS.primaryRed },
    {
        id: 5,
        title: 'Terms & Conditions',
        icon: 'document-text-outline',
        color: COLORS.primaryRed,
    },
    {
        id: 6,
        title: 'Logout',
        icon: 'log-out-outline',
        color: COLORS.primaryRed,
    },
];