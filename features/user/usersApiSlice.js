import { apiSlice } from '@/app/api/apiSlice'
import {createEntityAdapter, createSelector} from '@reduxjs/toolkit'

 const usersAdapter = createEntityAdapter({})
 const initialState = usersAdapter.getInitialState()

  export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       getUsers: builder.query({
           query: () => '/users',
            validateStatus: (response, result) => {
                   return response.status === 200 && !result.isError
            },
           //  keepUnusedDataFor:5,
           transformResponse: responseData => {
               const usersArray = responseData.users || []
            const loadedUsers = usersArray.map(user => {
              user.id = user._id
              return user
            })
            return usersAdapter.setAll(initialState, loadedUsers)
          },
            providesTags: (result, error, arg) => {
               if(result?.ids){
            return [{type:'User', id:'List'},
            ...result.ids.map(id => ({type: 'User', id}))
           ]
               }else {
                   return [{type: 'User', id: 'List'}]
               }
            }
       }),
       
         addNewUser: builder.mutation({
           query: initailUsersData => ({
               url: '/users',
               method: 'POST',
               body: {
                   ...initailUsersData
               }
           }),
           invalidatesTags: [
               {type:'User', id: 'List'}
           ]
         }),
         verifyEmail: builder.mutation({
           query: ({otp, userId}) => ({
               url: 'auth/verify-account',
               method: 'POST',
               body: {
                  otp
               }
           }),
           invalidatesTags: [
               {type:'User', id: 'List'}
           ]
         }),
         resendOtp: builder.mutation({
           query: initailUsersData => ({
               url: '/auth/resend-otp',
               method: 'POST',
               body: {
                 ...initailUsersData
               }
           }),
           invalidatesTags: [
               {type:'User', id: 'List'}
           ]
         }),
         updateUserProfile: builder.mutation({
  query: ({ profilePics, userId }) => ({
    url: '/users/profile-pic',
    method: 'PUT',
    body: { profilePics }
  }),
  async onQueryStarted({ profilePics, userId }, { dispatch, queryFulfilled }) {
    // Optimistic update using the adapter pattern
      const patchResult = dispatch(
       apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
        usersAdapter.updateOne(draft, {
          id: userId,
          changes: { profilePics }
        });
      })
    );

    try {
      const { data: updatedUser } = await queryFulfilled;
      
      // Optional: Update with server response if needed
      dispatch(
        apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
          usersAdapter.updateOne(draft, {
            id: userId,
            changes: { profilePics: updatedUser.profilePics }
          });
        })
      );
    } catch (error) {
      patchResult.undo();
      console.error('Profile update failed:', error);
    }
  },
  invalidatesTags: (result, error, { userId }) => [
    { type: 'User', id: userId }
  ]
}),
     }),
       overrideExisting: true
        })

     export  const {
        useGetUsersQuery,
        useAddNewUserMutation,
        useVerifyEmailMutation,
        useUpdateUserProfileMutation,
        useResendOtpMutation
      } = usersApiSlice


  export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

  const selectUsersData = createSelector(
   selectUsersResult,
   usersResult => usersResult.data
  )

   export const {
       selectAll: selectAllUsers,
       selectIds: selectUsersIds,
       selectById: selectUsersById
     } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
   