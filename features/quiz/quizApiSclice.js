import { apiSlice } from "@/app/api/apiSlice";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const quizAdapter = createEntityAdapter({})
 
const initialState = quizAdapter.getInitialState()

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuiz: builder.query({
            query: ({level = '', subject = '', search = '', page = 1, limit = 9}) => ({
               url: '/quiz/get-quiz',
               params: {
                level,
                subject,
                search,
                page,
                limit
               }
            }),
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedQuiz = responseData.quiz.map(quiz => ({
                ...quiz,
                id: quiz._id
              }));
              return {
                quizes: quizAdapter.setAll(initialState, loadedQuiz),
                totalPages: responseData?.totalPages
              }
            },
            providesTags: (result, error, arg) => {
              if(result?.ids) {
                return [
                  { type: 'Quiz', id: 'List' },
                  ...result.ids.map(id => ({ type: 'Quiz', id }))
                ];
              } else {
                return [{ type: 'Quiz', id: 'List' }];
              }
            }
          }),
          getQuizId: builder.query({
                      query: (id) => `/quiz/get-quiz/${id}`,
                       validateStatus: (response, result) => {
                              return response.status === 200 && !result.isError
                       },
                      //  keepUnusedDataFor:5,
                      transformResponse: responseData => {
                          // Single feed response doesn't need .feed property
                          return quizAdapter.setOne(initialState, {
                            ...responseData.quizId,
                            id: responseData.quizId._id
                          });
                        },
                       providesTags: (result, error, arg) => {
                          if(result?.ids){
                       return [{type:'Quiz', id:'List'},
                       ...result.ids.map(id => ({type: 'Quiz', id}))
                      ]
                          }else {
                              return [{type: 'Quiz', id: 'List'}]
                          }
                       }
                  }),
          addNewQuiz: builder.mutation({
            query: initailQuizData => ({
                url: '/quiz/create-quiz',
                method: 'POST',
                body: {
                    ...initailQuizData
                }
            }),
            invalidatesTags: [
                {type:'Quiz', id: 'List'}
            ]
          }),
          getUserQuiz: builder.query({
                               query: (userId) => `/quiz/get-quiz/user/${userId}`,
                               validateStatus: (response, result) => {
                                      return response.status === 200 && !result.isError
                               },
                               transformResponse: responseData => {
                                  const loadedQuizs = responseData.userQuiz.map(quiz => {
                                      quiz.id = quiz._id
                                        return quiz 
                                  })
                                  return quizAdapter.setAll(initialState, loadedQuizs)
                               },
                               providesTags: (result, error, arg) => {
                                  if(result?.ids){
                               return [{type:'Quiz', id:'List'},
                               ...result.ids.map(id => ({type: 'Quiz', id}))
                              ]
                            }else {
                            return [{type: 'Quiz', id: 'List'}]
                            }
                    }
            }),
           }),
           overrideExisting: true

        })

 export const {  
  useGetQuizQuery,
  useAddNewQuizMutation,
  useGetQuizIdQuery,
  useGetUserQuizQuery
} = quizApiSlice

// returns the query result object
export const selectQuizResult = quizApiSlice.endpoints.getQuiz.select()

// creates memoized selector
const selectQuizData = createSelector(
selectQuizResult,
quizResult => quizResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllQuizs,
selectById: selectQuizById,
selectIds: selectQuizIds
// Pass in a selector that returns the feeds slice of state
} = quizAdapter.getSelectors(state => selectQuizData(state) ?? initialState)

