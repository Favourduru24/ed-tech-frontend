import { apiSlice } from "@/app/api/apiSlice";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const tutorAdapter = createEntityAdapter({})
 
const initialState = tutorAdapter.getInitialState()

export const tutorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTutor: builder.query({
            query: ({subject = '', duration = '', search = '', page = 1, limit = 9}) => ({
              url: '/tutor/get-tutor',
               params: {
                subject,
                duration,
                search,
                page,
                limit
              }
            }),
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedTutor = responseData.data.map(tutor => ({
                ...tutor,
                id: tutor._id
              }));
             return {
            // Return both the normalized tutor data and pagination info
            tutor: tutorAdapter.setAll(initialState, loadedTutor),
            totalPages: responseData.totalPages
            };
            },
            providesTags: (result, error, arg) => {
              if(result?.ids) {
                return [
                  { type: 'Tutor', id: 'List' },
                  ...result.ids.map(id => ({ type: 'Tutor', id }))
                ];
              } else {
                return [{ type: 'Tutor', id: 'List' }];
              }
            }
          }),
         getTutorStats: builder.query({
         query: () => '/history/get-user-tutor-stat',
         transformResponse: (responseData) => {
          return responseData.data || [];
    
     
  },
  providesTags: (result, error, arg) => 
    result
      ? [
          { type: 'Tutor', id: 'LIST' },
          ...result.map(stat => ({ type: 'Tutor', id: stat.subject }))
        ]
      : [{ type: 'Tutor', id: 'LIST' }]
}),
          getTutorId: builder.query({
                      query: (id) => `/tutor/get-tutor/${id}`,
                       validateStatus: (response, result) => {
                              return response.status === 200 && !result.isError
                       },
                      //  keepUnusedDataFor:5,
                      transformResponse: responseData => {
                          // Single feed response doesn't need .feed property
                          return tutorAdapter.setOne(initialState, {
                            ...responseData.tutorId,
                            id: responseData.tutorId._id
                          });
                        },
                       providesTags: (result, error, arg) => {
                          if(result?.ids){
                       return [{type:'Tutor', id:'List'},
                       ...result.ids.map(id => ({type: 'Tutor', id}))
                      ]
                          }else {
                              return [{type: 'Tutor', id: 'List'}]
                          }
                       }
                  }),
                   getUserTutor: builder.query({
                               query: (userId) => `/tutor/get-tutor/user/${userId}`,
                               validateStatus: (response, result) => {
                                      return response.status === 200 && !result.isError
                               },
                               transformResponse: responseData => {
                                  const loadedTutors = responseData.data.map(tutor => {
                                      tutor.id = tutor._id
                                        return tutor 
                                  })
                                  return tutorAdapter.setAll(initialState, loadedTutors)
                               },
                               providesTags: (result, error, arg) => {
                                  if(result?.ids){
                               return [{type:'Tutor', id:'List'},
                               ...result.ids.map(id => ({type: 'Tutor', id}))
                              ]
                                  }else {
                                      return [{type: 'Tutor', id: 'List'}]
                                  }
                               }
                          }),
          addNewTutor: builder.mutation({
            query: initailTutorData => ({
                url: '/tutor/create-tutor',
                method: 'POST',
                body: {
                    ...initailTutorData
                }
            }),
            invalidatesTags: [
                {type:'Tutor', id: 'List'}
            ]
          })
        
        }),
        overrideExisting: true

})

export const {  
 useGetTutorQuery,
 useGetTutorIdQuery,
 useGetTutorStatsQuery,
 useGetUserTutorQuery,
 useAddNewTutorMutation,
} = tutorApiSlice

// returns the query result object
export const selectTutorResult = tutorApiSlice.endpoints.getTutor.select()

// creates memoized selector
const selectTutorData = createSelector(
selectTutorResult,
tutorResult => tutorResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllTutors,
selectById: selectTutorById,
selectIds: selectTutorIds
// Pass in a selector that returns the feeds slice of state
} = tutorAdapter.getSelectors(state => selectTutorData(state) ?? initialState)

