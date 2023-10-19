import { AuthChangeEvent, Session } from '@supabase/gotrue-js';
import { supabaseAuth } from 'lib/constants';
import { addUpdateWallet } from 'lib/hooks/generateWallet';
import { toast } from 'react-toastify';

export const fetchProfile = async (id: string) => {
  try {
    let { data: profile, error } = await supabaseAuth
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profile && !profile.wallet_address) {
      const wallet = await addUpdateWallet(id);
      if (wallet) {
        return profile;
      }
    } else if (profile) {
      return profile;
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    // Handle the error here or rethrow it for higher-level error handling.
    console.error('Error fetching profile:', error);
    throw error; // Rethrow the error if needed.
  }
};

export async function updatePassword() {
  try {
    const newPassword = prompt('What would you like your new password to be?');
    let { data, error } = await supabaseAuth.auth.updateUser({
      password: newPassword!
    });

    if (data) {
      toast.success('Password updated successfully!');
    }
    if (error) {
      toast.error('There was an error updating your password.');
      console.error('Error updating password:', error);
    }
  } catch (error) {
    // Handle the error here or rethrow it for higher-level error handling.
    console.error('Error in updatePassword:', error);
    throw error; // Rethrow the error if needed.
  }
}

export async function handleAuthChangeEvent(router: any) {
  try {
    let [
      { data: userSessionData },
      {
        data: { subscription: subscriptionData }
      }
    ] = await Promise.all([
      supabaseAuth.auth.getSession(),
      supabaseAuth.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {
          if (currentSession && event === 'SIGNED_IN') {
            //   const profile = await fetchProfile(currentSession?.user.id);
            // useAuthStore.setState({ user: currentSession?.user});
            router.refresh();
          } else if (event === 'SIGNED_OUT') {
            //  refresh()
          }
          if (event === 'PASSWORD_RECOVERY') {
            const newPassword = prompt(
              'What would you like your new password to be?'
            );
            let { data, error } = await supabaseAuth.auth.updateUser({
              password: newPassword!
            });

            if (data) {
              toast.success('Password updated successfully!');
            }
            if (error) {
              toast.error('There was an error updating your password.');
              console.error('Error updating password:', error);
            }
          }
        }
      )
    ]);

    return {
      subscription: subscriptionData,
      session: userSessionData.session,
      unsubscribe: () => subscriptionData?.unsubscribe()
    };
  } catch (error) {
    // Handle the error here or rethrow it for higher-level error handling.
    console.error('Error in handleAuthChangeEvent:', error);
    throw error; // Rethrow the error if needed.
  }
}

export const getUserData = async () => {
  const { data: session } = await supabaseAuth.auth.getSession();
  if (session && session?.session) {
    let { data: authUser } = await supabaseAuth.auth.getUser();
    if (authUser?.user) {
      const profile = await fetchProfile(authUser.user.id);
      return { user: authUser.user, profile };
    }
    return { user: undefined, profile: undefined };
  }
};
