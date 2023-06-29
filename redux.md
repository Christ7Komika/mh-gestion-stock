## app/store.ts

import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
reducer: {
posts: postsReducer,
comments: commentsReducer,
users: usersReducer,
},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

## app/hooks.ts

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

## features/counter/counterSlice.ts

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface CounterState {
value: number
}

// Define the initial state using that type
const initialState: CounterState = {
value: 0,
}

export const counterSlice = createSlice({
name: 'counter',
// `createSlice` will infer the state type from the `initialState` argument
initialState,
reducers: {
increment: (state) => {
state.value += 1
},
decrement: (state) => {
state.value -= 1
},
// Use the PayloadAction type to declare the contents of `action.payload`
incrementByAmount: (state, action: PayloadAction<number>) => {
state.value += action.payload
},
},
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer

## features/counter/Counter.tsx

import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
// The `state` arg is correctly typed as `RootState` already
const count = useAppSelector((state) => state.counter.value)
const dispatch = useAppDispatch()

// omit rendering logic
}
