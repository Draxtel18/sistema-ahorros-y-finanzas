import { supabase } from './supabaseClient'

export const registerUser = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
    return user;
};


export const loginUser = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return user;
};
