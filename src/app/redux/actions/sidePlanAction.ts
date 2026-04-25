import { createAsyncThunk } from '@reduxjs/toolkit';
import { floorPlanAnalysisApi, uploadFloorSidePlanApi } from '../../api/config';
import { rootApiNew } from '../../api/rootApi';

// Updated type to reflect React Native file structure
type uploadFloorSidePlanActionType = {
    file: {
        uri: string;
        name: string;
        type: string;
    };
};

export const UploadFloorSidePlanAction = createAsyncThunk<
    any,
    uploadFloorSidePlanActionType,
    { rejectValue: any }
>('uploadFloorSidePlan/post', async (payload, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        // The key 'file' must match the API requirement seen in your image
        formData.append('file', {
            uri: payload.file.uri,
            name: payload.file.name,
            type: payload.file.type,
        } as any);

        const response = await rootApiNew.post(uploadFloorSidePlanApi, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // Optional: track upload progress
            transformRequest: (data, headers) => {
                return data; // Required for some versions of Axios + React Native
            },
        });

        console.log('response.data===>', response.data);

        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || 'Upload failed');
    }
});

export const FloorPlanAnalysisAction = createAsyncThunk<
    any,
    any,
    { rejectValue: any }
>('floorPlanAnalysis/post', async (postFloorPlanAnalysis, { rejectWithValue }) => {
    console.log('postFloorPlanAnalysis===>', postFloorPlanAnalysis);
    try {
        const response = await rootApiNew.post(floorPlanAnalysisApi, postFloorPlanAnalysis);
        console.log('response.data===>', response.data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});


