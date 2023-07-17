import { supabase } from "lib/constants";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { readSingleContractURI } from "lib/hooks/readSingleContractURI";

const fetchCollectibles = async () => {
  try {
    const { data: drops, error } = await supabase
      .from("drops")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error();
    }
    if (drops) {
      const contractAddresses = drops?.map((drop) => drop.contract_address);

      if (contractAddresses) {
        try {
          const metaData = await readContractURIs(contractAddresses);
          const dropsWithMetaData = drops?.map((drop, index) => ({
            drop,
            metaData: metaData[index]?.metadata,
          }));

          return { dropsWithMetaData, drops, contractAddresses, metaData };
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching drops:", error);
  }
};

// const { data: drops, isLoading, error } = useQuery(['drops', fetchCollectibles]);

const addPlaylist = async (userId: any, title: any, uri: any) => {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .insert([{ title: title, user_id: userId, uri: uri }]);

  return { addPlaylist, addPlaylistError };
};

const getUsersPlaylist = async (userId: any) => {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId);

  return { addPlaylist, addPlaylistError };
};

const fetchSingleCollectible = async (slug: any) => {
  try {
    let { data: drop, error } = await supabase
      .from("drops")
      .select("*")
      .eq("slug", slug);

    if (drop !== null && drop.length > 0) {
      const contractAddress = drop[0]?.contract_address;

      if (contractAddress) {
        try {
          const metaData: any = await readSingleContractURI(contractAddress);

          const dropWithMetaData: any = {
            drop: drop[0],
            metaData: metaData,
          };

          const reactionCount = await getTotalReactions(drop[0]?.id);
          const dropComments = await getDropComments(drop[0]?.id);

          return {
            error,
            drop: drop[0],
            reactionCount,
            dropComments,
            dropWithMetaData,
          };
        } catch (error) {
          console.error("Error fetching single contract URI:", error);
        }
      } else {
        return { error: "Not Found", drop: null };
      }
    }
  } catch (error) {
    console.error("Error fetching single collectible:", error);
  }
};

const fetchProfilesForDrops = async (id: any) => {
  let { data: dropProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  return dropProfiles;
};

const getAllUsers = async () => {
  let { data: users, error } = await supabase
    .from("profiles")
    .select("username, id");
  if (error) {
    console.error("error", error);
  }
  return users;
};

const getProfilesWithDrops = async () => {
  const { data: users, error } = await supabase.from("profiles").select(`
    id, city, state, country,
     drops (
      user_id
    )`);

  if (error) {
    console.error(error);
    return;
  }

  const filteredProfiles = users?.filter((user) => user.drops.length > 1);
  return filteredProfiles;
};

const checkUser = async (user: any) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, username, avatar_url, website, full_name, city, state, country, bio"
    )
    .eq("username", user);

  if (error) {
    console.error("error", error);
  }

  if (profiles !== null && profiles.length > 0) {
    return { exists: true, profile: profiles[0] };
  } else {
    return { exists: false, profile: null };
  }
};

const addReaction = async ({ dropId, reactionType, userId }: any) => {
  if (userId && dropId && reactionType) {
    let { data, error } = await supabase
      .from("drop_reactions")
      .insert([
        { drop_id: dropId, reaction_type: reactionType, user_id: userId },
      ]);

    if (error) {
      throw error;
    }
    return data;
  }
};

const checkUserReactions = async (dropId: string, userId: string) => {
  const { data, error } = await supabase
    .from("drop_reactions")
    .select()
    .eq("drop_id", dropId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
};

const checkUserSingleCollect = async (dropId: string, userId: string) => {
  const { data, error } = await supabase
    .from("drop_collects")
    .select()
    .eq("drop_id", dropId)
    .eq("user_id", userId);

  if (data?.length == 0) {
    return false;
  } else {
    // Handle error
    return true;
  }
};

const deleteReaction = async ({
  dropId,
  userId,
}: {
  dropId: string;
  userId: string;
}) => {
  let { data, error } = await supabase
    .from("drop_reactions")
    .delete()
    .eq("drop_id", dropId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
};

const getTotalReactions = async (dropId: string) => {
  try {
    const { count, error } = await supabase
      .from("drop_reactions")
      .select("count", { count: "exact", head: true })
      .eq("drop_id", dropId)
      .single();

    if (error) {
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error("Error:", error);
    // Handle error
    return 0;
  }
};

const getDropComments = async (dropId: string) => {
  try {
    const { data, error } = await supabase
      .from("drop_comments")
      .select(
        `*,
      profiles (
        username
      )
      `
      )
      .eq("drop_id", dropId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const addDropComment = async (
  dropId: string,
  comment: string,
  userId: string
) => {
  if (userId && dropId && comment) {
    let { data, error } = await supabase
      .from("drop_comments")
      .insert([{ drop_id: dropId, comment: comment, user_id: userId }]);

    if (error) {
      throw error;
    }
    return data;
  }
};

const deleteDropComment = async (
  dropId: string,
  userId: string,
  commentId: string
) => {
  let { data, error } = await supabase
    .from("drop_comments")
    .delete()
    .eq("drop_id", dropId)
    .eq("user_id", userId)
    .eq("id", commentId);

  if (error) {
    throw error;
  }

  return data;
};

const transportPK = async (userId: any) => {
  // Retrieve decrypted data from the `decrypted_secrets` view
  const { data, error } = await supabase
    .from("decrypted_profiles")
    .select("access_key")
    .eq("id", userId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

const checkSubscription = async (id: any) => {
  try {
    // Check if a subscription already exists for the user
    const { data: existingSubscription, error: existingSubscriptionError } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", id)
        .single();

    if (existingSubscriptionError) {
      console.log(existingSubscriptionError.message);
    }

    return existingSubscription;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return null;
  }
};

const createSubscription = async (subData: any, id: any) => {
  console.log(id, "user_id");
  try {
    // Check if a subscription already exists for the user
    const existingSubscription = await checkSubscription(id);

    if (existingSubscription !== null) {
      // Delete the existing subscription
      await supabase.from("subscriptions").delete().eq("user_id", id);
    }

    // Store the new subscription data in Supabase
    const { data: newSubscription, error: newSubscriptionError } =
      await supabase.from("subscriptions").insert([
        {
          user_id: id,
          price_per_month: subData?.pricePerMonth,
          tier_1: !!subData?.subscriptionBundle?.includes("3"), // Convert to boolean
          tier_2: !!subData?.subscriptionBundle?.includes("6"), // Convert to boolean
          tier_3: !!subData?.subscriptionBundle?.includes("12"), // Convert to boolean
          crypto: !!subData?.paymentMethod?.includes("crypto"), // Convert to boolean
          cash: !!subData?.paymentMethod?.includes("cash"), // Convert to boolean
        },
      ]);

    if (newSubscriptionError) {
      throw new Error(newSubscriptionError.message);
    }

    // Do something with the stored subscription data, e.g., redirect to success page
    console.log("Subscription created:", newSubscription);
    return { subscription: newSubscription };
    // Invalidate the subscription tiers query to trigger refetch
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error };
  }
};

export {
  deleteReaction, // delete reaction from drop
  addReaction, // add reaction to drop
  checkUserReactions, // check if reaction and which on drop
  fetchCollectibles, // getting all drops
  addPlaylist, // create playlist name and row in db
  getUsersPlaylist, // getting the users playlist
  fetchSingleCollectible, // fetch drop for page
  fetchProfilesForDrops, // getting related profile to drops
  getAllUsers, // getting all the profiles
  getProfilesWithDrops, // getting profiles that have drops
  checkUser, // check if the user exists
  getTotalReactions, // reaction count for each drop
  checkUserSingleCollect, // check to see if user collected a drop
  addDropComment,
  deleteDropComment,
  getDropComments,
  createSubscription,
  checkSubscription,
};
