import { apiSlice } from "@/app/api/apiSlice";

import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const notificationAdapter = createEntityAdapter({
  selectId: (notification) => notification.id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
});
 
const initialState = notificationAdapter.getInitialState()

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // getNoification: builder.query({
        //     query: () => '/notification',
        //     validateStatus: (response, result) => {
        //       return response.status === 200 && !result.isError;
        //     },
        //     transformResponse: (responseData) => {
        //       const loadedNotification = responseData.map(notify => ({
        //         ...notify,
        //         id: notify._id
        //       }));
        //       return notificationAdapter.setAll(initialState, loadedNotification);
        //     },
        //     providesTags: (result, error, arg) => {
        //       if(result?.ids) {
        //         return [
        //           { type: 'Notification', id: 'List' },
        //           ...result.ids.map(id => ({ type: 'Notification', id }))
        //         ];
        //       } else {
        //         return [{ type: 'Notification', id: 'List' }];
        //       }
        //     }
        //   }),
         getNotification: builder.query({
       query: ({ notification = ''}) => ({
            url: `/notification`,
            params: {
            notification,
            }
          }),
      transformResponse: (response) => {
        if (!Array.isArray(response)) {
          console.error('Expected array, got:', response);
          return notificationAdapter.getInitialState();
        }

        const normalized = response.map(item => ({
          id: item.id, // Must match backend response
          ...item      // Spread other properties
        }));

        return notificationAdapter.setAll(
          notificationAdapter.getInitialState(),
          normalized
        );
      },
      providesTags: (result) => [
        { type: 'Notification', id: 'LIST' },
        ...(result?.ids?.map(id => ({ type: 'Notification', id })) || [])
      ]
    }),
          deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notification/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Notification', id:arg.id}]
          }),
        }),
        overrideExisting: true
        })

   export const {  
     useGetNotificationQuery,
     useDeleteNotificationMutation
} = notificationApiSlice

// returns the query result object
export const selectNotificationResult = notificationApiSlice.endpoints.getNotification.select()

// creates memoized selector
const selectNotificationData = createSelector(
selectNotificationResult,
notificationResult => notificationResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllNotifications,
selectById: selectNotificationById,
selectIds: selectNotificationIds
// Pass in a selector that returns the notifications slice of state
} = notificationAdapter.getSelectors(state => selectNotificationData(state) ?? initialState)

