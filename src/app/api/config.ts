export const GOOGLE_PLACES_API_KEY = 'AIzaSyBUOey4Ezc9bmlVZbvSv5QNFaUprO9Mgwg';

export const googleMapStreetViewApi = (lat: number, lng: number) => `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${GOOGLE_PLACES_API_KEY}`

export const baseUrl = 'https://api.bastu.dtftsolutions.com/api/v1';

export const baseUrlNew = 'https://api.vastu.dtftsolutions.com/api/v1';

export const baseWebUrlDev = 'https://admin.bastu.dtftsolutions.com';

export const baseWebUrl = (angle: number) => `${baseWebUrlDev}/vastu?angle=${angle}`;

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

