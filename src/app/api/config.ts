export const GOOGLE_PLACES_API_KEY = 'AIzaSyBUOey4Ezc9bmlVZbvSv5QNFaUprO9Mgwg';

export const googleMapStreetViewMetadataApi = (lat: number, lng: number, radius?: number) =>
    `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&radius=${radius}&key=${GOOGLE_PLACES_API_KEY}`;

export const googleMapStreetViewUrl = (pano_id: string) => `https://maps.googleapis.com/maps/api/streetview?size=600x300&pano=${pano_id}&key=${GOOGLE_PLACES_API_KEY}`;


export const googleMapStaticFallbackApi = (lat: number, lng: number) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x300&markers=color:red%7C${lat},${lng}&key=${GOOGLE_PLACES_API_KEY}`;

export const googleMapPlacePhotoApi = (photoReference: string) =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;

export const googleNoImageFound = 'https://via.placeholder.com/600x300?text=No+Image';

export const baseUrl = 'https://api.bastu.dtftsolutions.com/api/v1';

export const baseUrlNew = 'https://api.vastu.dtftsolutions.com/api/v1';

export const baseWebUrlDev = 'https://admin.bastu.dtftsolutions.com';

export const updatePlaceWebUrl = (angle: number) => `${baseWebUrlDev}/vastu?angle=${angle}`;

// Endpoint list
export const registerApi = '/auth/register';
export const loginApi = '/auth/login';
export const logoutApi = '/auth/logout';
export const refreshTokenApi = '/auth/refresh';
export const forgotPasswordApi = '/auth/forgot-password';
export const getProfileApi = '/auth/profile';


// Upload side-plan & Analysis
export const uploadFloorSidePlanApi = '/floor-plans/extract';
export const floorPlanAnalysisApi = '/floor-plans/analyze';

