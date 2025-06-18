import { apiSlice } from "@/app/api/apiSlice";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const commentAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,  // CRITICAL: Tell adapter how to get IDs
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt) // Optional sorting
})
 
const initialState = commentAdapter.getInitialState()

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
    getComment: builder.query({
      query: (feedId) => `/comment/get-comment/${feedId}`, // Remove object destructuring
      transformResponse: (responseData) => {
      const normalizedComments = responseData.comment.map(comment => ({
      ...comment,
      id: comment._id // Ensure consistent ID field
     }));
    
     return commentAdapter.setAll(
      commentAdapter.getInitialState(),
      normalizedComments
    );
  },
  providesTags: (result) =>
    result?.ids 
      ? [
          { type: 'Comment', id: 'LIST' },
          ...result.ids.map(id => ({ type: 'Comment', id }))
        ]
      : [{ type: 'Comment', id: 'LIST' }]
}),
        addNewComment: builder.mutation({
  query: (initialCommentData) => ({
    url: '/comment/create-comment',
    method: 'POST',
    body: initialCommentData,
  }),
  async onQueryStarted({ feedId, ...commentData }, { queryFulfilled, dispatch }) {
    try {
      const { data: createdComment } = await queryFulfilled;
      
       console.log({createdComment})
      // Normalize the comment with the correct userId
      const normalizedComment = {
        ...createdComment,
        id: createdComment._id,
        userId: createdComment.userId || commentData.userId, // Fallback to input
      };

      dispatch(
        apiSlice.util.updateQueryData('getComment', feedId, (draft) => {
          commentAdapter.addOne(draft, normalizedComment);
        })
      );
    } catch (error) {
      console.error('Cache update failed:', error);
    }
  },
  invalidatesTags: (result, error, { feedId }) => [
    { type: 'Comment', id: 'LIST' },
    { type: 'Comment', id: feedId },
  ],
}),
         updateComment: builder.mutation({
            query: initailCommentData => ({
                url: '/comment',
                method:'PATCH',
                body: {
                    ...initailCommentData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Comment', id: arg.id}]
            }
          }),
          deleteComment: builder.mutation({
            query: ({commentId}) => ({
                url: `/comment/delete-comment/${commentId}`,
                method: 'DELETE',
                body: {
                    commentId
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Comment', id:arg.id}]
          }),
          likeComment: builder.mutation({
  query: ({ commentId }) => ({
    url: `/comment/like-comment/${commentId}`,
    method: 'PUT',
  }),
  async onQueryStarted({ commentId }, { queryFulfilled, dispatch, getState }) {
    const token = getState().auth.token;
    
    // 2. Decode JWT to extract user ID
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const currentUser = decodedToken?.UserInfo?.id || decodedToken?.id; // Adjust based on your JWT structure

    if (!currentUser) {
       console.error("User ID not found in token");
      return;
    }

    console.log({currentUser})

    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getComment', undefined, (draft) => {
        const comment = draft?.entities[commentId];
    

        if (!comment) return;

        const isLiked = comment.likes?.includes(currentUser);
        comment.likes = isLiked
          ? comment.likes.filter(id => id !== currentUser) // Unlike
          : [...(comment.likes || []), currentUser]; // Like
        comment.likesCount = (comment.likesCount || 0) + (isLiked ? -1 : 1);
      })
    );

    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
  invalidatesTags: (_, __, { commentId }) => [
    { type: 'Comment', id: commentId },
    { type: 'Comment', id: 'LIST' },
  ],
}),
        }),
        overrideExisting: true

})

export const {  
 useGetCommentQuery,
 useAddNewCommentMutation,
 useUpdateCommentMutation,
 useDeleteCommentMutation,
 useLikeCommentMutation
} = commentApiSlice

// returns the query result object
export const selectCommentResult = commentApiSlice.endpoints.getComment.select()

// creates memoized selector
const selectCommentData = createSelector(
selectCommentResult,
commentResult => commentResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllComments,
selectById: selectCommentById,
selectIds: selectCommentIds
// Pass in a selector that returns the feeds slice of state
} = commentAdapter.getSelectors(state => selectCommentData(state) ?? initialState)

