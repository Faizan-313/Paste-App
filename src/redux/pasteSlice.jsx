import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
    name: 'paste',
    initialState: {
        pastes: localStorage.getItem("pastes")
            ? JSON.parse(localStorage.getItem("pastes"))
            : []
    },
    reducers: {
        addToPaste: (state,action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success('Paste added successfully');
        },
        updateToPaste: (state,action) => {
            const { pasteId, title, content } = action.payload;
            const existingPaste = state.pastes.find((paste) => paste.pasteId === pasteId);
            if(existingPaste){
                existingPaste.title = title;
                existingPaste.content = content;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success(`"${title}" updated successfully`);
            }else{
                toast.error('Paste not found');
            }
            
        },
        resetAllPaste: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success('All pastes removed successfully');
        },
        removeFromPaste: (state,action) => {
            const pasteId = action.payload;
            const existingPaste = state.pastes.find((paste)=> paste.pasteId === pasteId);
            if(existingPaste){
                state.pastes = state.pastes.filter((paste)=> paste.pasteId !== pasteId);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success(`"${existingPaste.title}" removed successfully`);
            }else{
                toast.error('Paste not found');
            }
        }
    }
})

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer


