import { supabaseAdmin } from "app/supabase-admin";

const createProfile = async (email: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: "example@email.com",
      email_confirm: true,
    });

    alert("New user created!"); // Alert for new user created
  } catch (error) {
    console.error("Error creating profile:", error);
  }
};

export { createProfile };
