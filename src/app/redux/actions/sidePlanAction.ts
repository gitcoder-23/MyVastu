import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFloorSidePlanApi } from '../../api/config';
import { rootApiNew } from '../../api/rootApi';

// Updated type to reflect React Native file structure
type uploadFloorSidePlanActionType = {
    file: {
        uri: string;
        name: string;
        type: string;
    };
};

export const uploadFloorSidePlanAction = createAsyncThunk<
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


