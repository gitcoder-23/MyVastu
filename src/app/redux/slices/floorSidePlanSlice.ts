import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FloorPlanAnalysisAction, UploadFloorSidePlanAction } from '../actions/sidePlanAction';

export interface FloorSidePlanState {
    sidePlanResponse: any | null;
    isSidePlanUploadLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;

    // floor plan analysis
    floorPlanAnalysisResponse: any | null;
    isFloorPlanAnalysisLoading: boolean;
    isErrorFloorPlanAnalysis: boolean;
    errorMessageFloorPlanAnalysis: string | undefined;
    // Place details all
    placeDetails: any | null;
    isPlaceDetailsLoading: boolean;
    isErrorPlaceDetails: boolean;
    errorMessagePlaceDetails: string | undefined;
}

const initialState: FloorSidePlanState = {
    sidePlanResponse: null,
    isSidePlanUploadLoading: false,
    isError: false,
    errorMessage: '',

    // floor plan analysis
    floorPlanAnalysisResponse: null,
    isFloorPlanAnalysisLoading: false,
    isErrorFloorPlanAnalysis: false,
    errorMessageFloorPlanAnalysis: '',
    // Place details all
    placeDetails: null,
    isPlaceDetailsLoading: false,
    isErrorPlaceDetails: false,
    errorMessagePlaceDetails: '',
};

const floorSidePlanSlice = createSlice({
    name: 'floorSidePlan',
    initialState,
    reducers: {
        // Reducer action
        setSidePlanResponseData: (state, action: PayloadAction<{ responseData: any }>) => {
            state.sidePlanResponse = action.payload.responseData;
            state.errorMessage = '';
            state.isSidePlanUploadLoading = false;
        },
        setClearSidePlanResponseData: state => {
            state.sidePlanResponse = null;
            state.isSidePlanUploadLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },

        // floor plan analysis
        setFloorPlanAnalysisResponseData: (state, action: PayloadAction<{ responseData: any }>) => {
            state.floorPlanAnalysisResponse = action.payload.responseData;
            state.errorMessageFloorPlanAnalysis = '';
            state.isFloorPlanAnalysisLoading = false;
        },
        setClearFloorPlanAnalysisResponseData: state => {
            state.floorPlanAnalysisResponse = null;
            state.isFloorPlanAnalysisLoading = false;
            state.isErrorFloorPlanAnalysis = false;
            state.errorMessageFloorPlanAnalysis = '';
        },
    },
    extraReducers: function (builder) {
        // UploadFloorSidePlanAction - pending
        builder.addCase(UploadFloorSidePlanAction.pending, state => {
            state.isSidePlanUploadLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });

        // UploadFloorSidePlanAction - fulfilled (success)
        builder.addCase(
            UploadFloorSidePlanAction.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isSidePlanUploadLoading = false;
                state.isError = false;
                const responseData = action.payload;
                state.sidePlanResponse = responseData;
            },
        );

        // UploadFloorSidePlanAction - rejected (failure)
        builder.addCase(UploadFloorSidePlanAction.rejected, (state, action) => {
            state.isSidePlanUploadLoading = false;
            state.isError = true;
            const responseData = action.payload as any;
            state.errorMessage = responseData?.message || 'Response Failed';
            state.sidePlanResponse = responseData || null;
        });

        // Floor plan analysis - pending
        builder.addCase(FloorPlanAnalysisAction.pending, state => {
            state.isFloorPlanAnalysisLoading = true;
            state.isErrorFloorPlanAnalysis = false;
            state.errorMessageFloorPlanAnalysis = '';
        });

        // Floor plan analysis - fulfilled (success)
        builder.addCase(
            FloorPlanAnalysisAction.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isFloorPlanAnalysisLoading = false;
                state.isErrorFloorPlanAnalysis = false;
                const responseData = action.payload;
                state.floorPlanAnalysisResponse = responseData;
            },
        );

        // Floor plan analysis - rejected (failure)
        builder.addCase(FloorPlanAnalysisAction.rejected, (state, action) => {
            state.isFloorPlanAnalysisLoading = false;
            state.isErrorFloorPlanAnalysis = true;
            const responseData = action.payload as any;
            state.errorMessageFloorPlanAnalysis = responseData?.message || 'Response Failed';
            state.floorPlanAnalysisResponse = responseData || null;
        });

    },
});

export const { setSidePlanResponseData, setClearSidePlanResponseData, setFloorPlanAnalysisResponseData, setClearFloorPlanAnalysisResponseData } = floorSidePlanSlice.actions;

export default floorSidePlanSlice.reducer;