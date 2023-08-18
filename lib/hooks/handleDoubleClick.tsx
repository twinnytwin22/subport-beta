import { supabase } from "lib/constants";
import { toast } from "react-toastify";

export const useHandleDoubleClick = async (event: any, { dropId, userId }: any) => {
  if (event.detail === 2) {
    console.log('double click');
    try {
      await addReaction({ dropId, userId });
      console.log('Like added successfully');
    } catch (error) {
      console.error('Error adding like:', error);
    }
  }
};

const addReaction = async ({ dropId, userId }: any) => {
  if (userId && dropId) {
    let { data, error } = await supabase
      .from("drop_reactions")
      .insert([
        { drop_id: dropId, reaction_type: 'like', user_id: userId },
      ]);

    if (error) {
      throw error;
    }
    toast("Like", {
        progress: undefined, 
        hideProgressBar: true, 
        autoClose: 1000
    })
    return data;
  }
};
