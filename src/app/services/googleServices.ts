import { googleMapStreetViewApi } from "../api/config";

export const fetchFacingGoogleDirection = async (lat: number, lng: number): Promise<{ pseudoAngle: number, data: any } | any> => {
    try {
        const response = await fetch(googleMapStreetViewApi(lat, lng));
        const data = await response.json();
        if (data.status === 'OK') {
            const pseudoAngle = Math.floor(Math.random() * 360);
            return { pseudoAngle, data }
        }
    } catch (error) {
        console.error('Error fetching direction:', error);
        return { pseudoAngle: 0, data: null }
    }
};