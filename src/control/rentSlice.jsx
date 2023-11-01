import { createSlice } from "@reduxjs/toolkit";

var current = new Date();

const initialState = {
    pickUpLoc: 0,
    dropOffLoc: 0,
    pickUpDate: current.toISOString(),
    dropOffDate: new Date((current).getTime() + 86400000 * 3).toISOString(),
    day: 3,
    extentions: [],
    sumPrice: 0,
    exPrice: 0,
    wrongChose:0
};

const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setPickUpDate: (state, action) => {
            if(new Date()>new Date(action.payload)){
                state.wrongChose++
                return 
            }
            if (new Date(state.dropOffDate)<new Date(action.payload)) {
                state.wrongChose++
                var data=((new Date(action.payload)))
                data.setDate(data.getDate()+3)
                state.dropOffDate=data.toISOString()
            }
            state.pickUpDate = action.payload;
        },
        setDropOffDate: (state, action) => {
            if (new Date(state.pickUpDate)>new Date(action.payload)) {
                state.wrongChose++
                return
            }
            state.dropOffDate = action.payload;
        },
        setWrongChose:(state)=>{
            state.wrongChose=0
        }
        ,
        setPickUpLoc: (state, action) => {
            state.pickUpLoc = action.payload;
        },
        setDropOffLoc: (state, action) => {
            state.dropOffLoc = action.payload;
        },
        setExtentios: (state, action) => {
            var data = action.payload;
            if (state.extentions.find(x => x == data)) {
                state.extentions = state.extentions.filter(x => x != data);
                switch (data) {
                    case 1:
                        state.exPrice -= (12.89 * state.day)
                        break;
                    case 2:
                        state.exPrice -= 6.43 * state.day
                        break;
                    case 3:
                        state.exPrice -= 25.72 * state.day
                        break;
                    case 4:
                        state.exPrice -= 3.47 * state.day
                        break;
                    case 5:
                        state.exPrice -= 3.47 * state.day
                        break;
                    case 6:
                        state.exPrice -= 4.98 * state.day
                        break;
                    default:
                        break;
                }

                
            }
            else {
                state.extentions.push(data)
                switch (data) {
                    case 1:
                        state.exPrice += (12.89 * state.day)
                        break;
                    case 2:
                        state.exPrice += 6.43 * state.day
                        break;
                    case 3:
                        state.exPrice += 25.72 * state.day
                        break;
                    case 4:
                        state.exPrice += 3.47 * state.day
                        break;
                    case 5:
                        state.exPrice += 3.47 * state.day
                        break;
                    case 6:
                        state.exPrice += 4.98 * state.day
                        break;

                    default:
                        break;
                }
            }
            console.log(state.extentions);
        },
        setSumPrice: (state, action) => {
            state.sumPrice = action.payload;
        },
        setDay: (state, action) => {
            state.day = action.payload;
        },
        setEmptyExt:(state)=>{
            state.extentions =[]
        },
        setExPrice:(state)=>{
            state.exPrice=0
        }
    }
});

export const { setPickUpDate, setDropOffDate, setPickUpLoc, setDropOffLoc, setExtentios, setSumPrice, setDay,setEmptyExt,setExPrice,setWrongChose } = rentSlice.actions;
export default rentSlice.reducer;