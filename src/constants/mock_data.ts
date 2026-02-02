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
        title: 'Home Audit',
        icon: 'search-outline',
        color: COLORS.leafGreen,
    },
    {
        id: 2,
        title: 'Directions',
        icon: 'compass-outline',
        color: COLORS.sageGreen,
    },
    { id: 3, title: 'Remedies', icon: 'leaf-outline', color: COLORS.mossGreen },
    {
        id: 4,
        title: 'Reports',
        icon: 'document-text-outline',
        color: COLORS.fernGreen,
    },
    {
        id: 5,
        title: 'Consultant',
        icon: 'people-outline',
        color: COLORS.mintGreen,
    },
    {
        id: 6,
        title: 'Settings',
        icon: 'settings-outline',
        color: COLORS.paleGreen,
    },
];