import { create } from 'zustand';
import { supabase } from 'lib/constants';
import { addDropComment, deleteDropComment, getDropComments } from 'utils/database';



interface Comment {

}

interface CommentsStore {
    comment: string;
    showTextarea: boolean;
    comments: Comment[];
    users: [];

    getComments: (dropId: string) => Promise<void>;
    getUsers: () => Promise<void>;
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddComment: (dropId: string, userId: string) => Promise<Comment[]>;
    handleDeleteComment: (dropId: string, userId: string, commentId: string) => Promise<void>;
    handleDiscardComment: () => void;
}

// Function to fetch comments for a specific drop


const useCommentsStore = create<CommentsStore>((set) => ({
    comment: '',
    showTextarea: false,
    comments: [],
    users: [],

    getComments: async (dropId: string) => {
        const dropComments = await getDropComments(dropId);
        set({ comments: dropComments });
    },

    getUsers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username, id');
        if (error) {
            throw error;
        }
        if (data) {
            const allUsers: any = data.map((user: any) => ({ display: user.username, id: user.id }));
            set({ users: allUsers });
        }
    },

    handleCommentChange: (e: any) => {
        set({ comment: e });
    },

    handleAddComment: async (dropId: string, userId: string) => {
        try {
            const { comment } = useCommentsStore.getState();
            await addDropComment(dropId, comment, userId);
            // Clear the comment input after successful submission
            set({ comment: '' });

            // Fetch the updated list of comments
            const updatedComments = await getDropComments(dropId);
            set({ comments: updatedComments });
            return updatedComments;
        } catch (error) {
            console.error('Error adding comment:', error);
            return [];
        }
    },

    handleDeleteComment: async (dropId: string, userId: string, commentId: string) => {
        try {
            await deleteDropComment(dropId, userId, commentId);
            await useCommentsStore.getState().getComments(dropId);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    },

    handleDiscardComment: () => {
        set({ showTextarea: false, comment: '' });
    },
}));

export default useCommentsStore;
