import { googleMapStreetViewMetadataApi } from "../api/config";

// export const fetchFacingGoogleDirection = async (lat: number, lng: number, radius: number = 5): Promise<{ pseudoAngle: number, data: any } | any> => {
//     try {
//         const response = await fetch(googleMapStreetViewMetadataApi(lat, lng, radius));
//         const data = await response.json();
//         console.log('data==>', data);
//         if (data.status === 'OK') {
//             const pseudoAngle = Math.floor(Math.random() * 360);
//             return { pseudoAngle, data }
//         }
//     } catch (error) {
//         console.error('Error fetching direction:', error);
//         return { pseudoAngle: 0, data: null }
//     }
// };

export const fetchFacingGoogleDirection = async (lat: number, lng: number, radius: number = 20) => {
    try {
        const response = await fetch(googleMapStreetViewMetadataApi(lat, lng, radius));
        const data = await response.json();

        if (data.status === 'OK' && data.location) {
            const svLat = data.location.lat;
            const svLng = data.location.lng;

            // Calculate bearing from the House (lat/lng) to the Street View point (svLat/svLng)
            const y = Math.sin(svLng - lng) * Math.cos(svLat);
            const x = Math.cos(lat) * Math.sin(svLat) -
                Math.sin(lat) * Math.cos(svLat) * Math.cos(svLng - lng);

            // Convert to degrees (0-360)
            let bearing = (Math.atan2(y, x) * 180) / Math.PI;
            const pseudoAngle = (bearing + 360) % 360;

            return { pseudoAngle, data };
        }
        return null;
    } catch (error) {
        return null;
    }
};