import { supabaseAdmin } from 'lib/constants';

const createProfile = async (
  email: string,
  setProfile: any,
  setIsProfileFetched: any
) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      email_confirm: true
    });

    if (data.user) {
      await fetchNewProfile(data?.user?.id, setProfile, setIsProfileFetched);
    }
    // Alert for new user created
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};

export { createProfile };

const fetchNewProfile = async (
  id: string,
  setProfile: any,
  setIsProfileFetched: any
) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, username, website, avatar_url, wallet_address, city, state, country'
      )
      .eq('id', id)
      .single();
    if (error) {
      throw error;
    }

    setProfile(data);
    setIsProfileFetched(true);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};
