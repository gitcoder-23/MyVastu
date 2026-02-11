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
        color: COLORS.grid1,
    },
    {
        id: 2,
        title: 'About Us',
        icon: 'information-circle-outline',
        color: COLORS.grid2,
    },
    {
        id: 3,
        title: 'Contact Us',
        icon: 'call-outline',
        color: COLORS.grid5,
    },
    { id: 4, title: 'Privacy Policy', icon: 'lock-closed-outline', color: COLORS.grid3 },
    {
        id: 5,
        title: 'Terms & Conditions',
        icon: 'document-text-outline',
        color: COLORS.grid4,
    },
    {
        id: 6,
        title: 'FAQs',
        icon: 'help-circle-outline',
        color: COLORS.grid6,
    },
];