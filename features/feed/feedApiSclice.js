import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const feedsAdapter = createEntityAdapter({
     
})
 
const initialState = feedsAdapter.getInitialState()

export const feedsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFeeds: builder.query({
          query: ({search = '', page = 1, limit = 5, category = '', date = ''}) => ({
            url: `/feeds`,
            params: {
            search,
            page,
            limit,
            date,
            category,
            }
          }),
          forceRefetch: ({ currentArg, previousArg }) => {
            // Trigger refetch when page changes
            return currentArg?.page !== previousArg?.page;
          },
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
          
          transformResponse: responseData => {
            // Transform the data before normalization
            const loadedFeeds = responseData.data.map(feed => ({  
              ...feed,
              id: feed._id // Convert _id to id
            }));
            
            return feedsAdapter.setAll(initialState, loadedFeeds);
          },
          
          providesTags: (result, error, arg) => {
            if(result?.ids){
              return [
                { type: 'Feed', id: 'LIST' },
                ...result.ids.map(id => ({ type: 'Feed', id }))
              ]
            } else {
              return [{ type: 'Feed', id: 'LIST' }]
            }
          }
        }),
        getFeed: builder.query({
            query: (id) => `/feeds/feed/${id}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
            transformResponse: responseData => {
                // Single feed response doesn't need .feed property
                return feedsAdapter.setOne(initialState, {
                  ...responseData.data,
                  id: responseData.data._id
                });
              },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
           getFeedByCategory: builder.query({
        query: ({id, categoryId}) => `/feeds/feed-category/${id}/${categoryId}`,
      validateStatus: (response, result) => {
       return response.status === 200 && !result.isError;
  },
  transformResponse: (responseData) => {
    // Now handles array response
    const loadedFeeds = responseData.map(feed => ({
      ...feed,
      id: feed._id
    }));
    return feedsAdapter.setAll(initialState, loadedFeeds);
  },
  providesTags: (result) => {
    return result?.ids 
      ? [
          { type: 'Feed', id: 'LIST' },
          ...result.ids.map(id => ({ type: 'Feed', id }))
        ]
      : [{ type: 'Feed', id: 'LIST' }];
  }
}),
          getUserFeed: builder.query({
          query: (userId) => `/feeds/feed/user/${userId}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
             transformResponse: responseData => {
                const loadedFeeds = responseData.data.map(feed => {
                    feed.id = feed._id
                      return feed 
                })
                return feedsAdapter.setAll(initialState, loadedFeeds)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
          addNewFeed: builder.mutation({
            query: initailFeedsData => ({
                url: '/feeds',
                method: 'POST',
                body: {
                    ...initailFeedsData
                }
            }),
            invalidatesTags: [
                {type:'Feed', id: 'List'}
            ]
          }),
                 updateFeed: builder.mutation({
                  query: ({ id, initailFeedsData }) => ({  // Destructure id from arguments
                    url: `/feeds/feed/update/${id}`,
                    method: 'PATCH',
                    body: {
                      ...initailFeedsData
                    }  // The rest of the data
                  }),
             invalidatesTags: (result, error, arg) => {
             return [{type: 'Feed', id: arg.id}]
            }
          }),
          likeFeed: builder.mutation({
            query: ({userId, id}) => ({
                url: `/feeds/feed/like/${id}`,
                method:'PUT',
                body: {userId}
            }),
            invalidatesTags: (result, error, { id }) => [
              { type: 'Feed', id },
              { type: 'Feed', id: 'LIST' }
            ]
          }),
          deleteFeed: builder.mutation({
            query: (id) => ({
                url: `/feeds/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Feed', id:arg.id}]
          }),
        }),
        overrideExisting: true
})

          export const {  
          useGetFeedsQuery,
          useGetFeedQuery,
          useGetUserFeedQuery,
          useAddNewFeedMutation,
          useUpdateFeedMutation,
          useDeleteFeedMutation,
          useLikeFeedMutation,
          useGetFeedByCategoryQuery
      } = feedsApiSlice

// returns the query result object
export const selectFeedsResult = feedsApiSlice.endpoints.getFeeds.select()

// creates memoized selector
const selectFeedsData = createSelector(
selectFeedsResult,
feedsResult => feedsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllFeeds,
selectById: selectFeedById,
selectIds: selectFeedIds
// Pass in a selector that returns the feeds slice of state
} = feedsAdapter.getSelectors(state => selectFeedsData(state) ?? initialState)

