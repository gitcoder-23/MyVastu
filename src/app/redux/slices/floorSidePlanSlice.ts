import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadFloorSidePlanAction } from '../actions/sidePlanAction';

export interface FloorSidePlanState {
    sidePlanResponse: any | null;
    isSidePlanUploadLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
}

const initialState: FloorSidePlanState = {
    sidePlanResponse: null,
    isSidePlanUploadLoading: false,
    isError: false,
    errorMessage: '',
};

const floorSidePlanSlice = createSlice({
    name: 'floorSidePlan',
    initialState,
    reducers: {
        // Reducer action
        setSidePlanResponseData: (state, action: PayloadAction<{ responseData: any }>) => {
            state.sidePlanResponse = action.payload.responseData;
            state.errorMessage = 'Login success';
            state.isSidePlanUploadLoading = false;
        },
        setClearSidePlanResponseData: state => {
            state.sidePlanResponse = null;
            state.isSidePlanUploadLoading = false;
            state.isError = false;
            state.errorMessage = 'Logout success';
        },
    },
    extraReducers: function (builder) {
        // uploadFloorSidePlanAction - pending
        builder.addCase(uploadFloorSidePlanAction.pending, state => {
            state.isSidePlanUploadLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });

        // uploadFloorSidePlanAction - fulfilled (success)
        builder.addCase(
            uploadFloorSidePlanAction.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isSidePlanUploadLoading = false;
                state.isError = false;
                const responseData = action.payload;
                state.sidePlanResponse = responseData;
            },
        );

        // uploadFloorSidePlanAction - rejected (failure)
        builder.addCase(uploadFloorSidePlanAction.rejected, (state, action) => {
            state.isSidePlanUploadLoading = false;
            state.isError = true;
            const responseData = action.payload as any;
            state.errorMessage = responseData?.message || 'Response Failed';
            state.sidePlanResponse = responseData || null;
        });

    },
});

export const { setSidePlanResponseData, setClearSidePlanResponseData } = floorSidePlanSlice.actions;

export default floorSidePlanSlice.reducer;