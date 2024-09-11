import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../features/store';

const selectUsers = (state: RootState) => state.users;

const selectUserById = (userId: string) =>
    createSelector([selectUsers], (usersState) =>
        usersState.users.find((user) => user.id === userId)
    );

export const useUserById = (userId: string) => {
    return useSelector(selectUserById(userId));
};