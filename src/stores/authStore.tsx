"use client"
import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useRef } from "react";
import {createStore, StoreApi, useStore} from "zustand";

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (v: boolean) => void;
    reset: () => void;
}

function initAuthState(initialUser: User | null ): AuthState {
    return {
        user: initialUser,
        isLoading: false,
        setUser: () => {},
        setLoading: () => {},
        reset: () => {},
    }
}

function createAuthStore(initialUser: User | null) {
    return createStore<AuthState>((set) => ({
        ...initAuthState(initialUser),
        setUser: (u) => set({user: u}),
        setLoading: (v) => set({isLoading: v}),
        reset: () => set(initAuthState(null)),
    }))
}

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

export function AuthStoreProvider({initialUser, children}: { initialUser: User | null, children: React.ReactNode }) {
    const storeRef = useRef<StoreApi<AuthState>>(null);
    if (!storeRef.current) {
        storeRef.current = createAuthStore(initialUser);
    }
    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    );
}

export function useAuthStore<T> (selector : (s: AuthState) => T): T {
    const store = useContext(AuthStoreContext);
    if (!store) {
        throw new Error("useAuthStore must be used within an AuthStoreProvider");
    }
    return useStore(store, selector);
}