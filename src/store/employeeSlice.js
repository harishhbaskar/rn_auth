import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMembers: [],
  categories: {
    'Engineering': [],
    'Data / Analytics': [],
    'Design / Marketing': [],
    'Management': [],
    'Operations': [],
    'Security / QA': [],
    'HR / Research': [],
    'Other': []
  }
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    processAndSetMembers: (state, action) => {
      const members = action.payload;
      state.allMembers = members;

      
      Object.keys(state.categories).forEach(key => state.categories[key] = []);

      members.forEach(member => {
        const title = member.title.toLowerCase();
        
        
        if (/(engineer|developer|architect|web)/i.test(title)) {
          state.categories['Engineering'].push(member.id);
        } else if (/(analyst|metrics|data)/i.test(title)) {
          state.categories['Data / Analytics'].push(member.id);
        } else if (/(designer|branding|marketing|creative)/i.test(title)) {
          state.categories['Design / Marketing'].push(member.id);
        } else if (/(manager|director|chief|executive|principal|lead)/i.test(title)) {
          state.categories['Management'].push(member.id);
        } else if (/(administrator|technician|assistant|coordinator|facilitator)/i.test(title)) {
          state.categories['Operations'].push(member.id);
        } else if (/(security|assurance|quality)/i.test(title)) {
          state.categories['Security / QA'].push(member.id);
        } else if (/(human|identity|research)/i.test(title)) {
          state.categories['HR / Research'].push(member.id);
        } else {
          state.categories['Other'].push(member.id);
        }
      });
    }
  },
});

export const { processAndSetMembers } = employeeSlice.actions;
export default employeeSlice.reducer;