import axios from 'axios'
import {
   
    CHAT_LIST_FAIL,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_REQUEST
  } from '../constants/constantsChat'
export const sendMessage = (messageobj)=>{
    return async () => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: `/api/chat/new`,
                data: messageobj
            })
        }
        catch (err) {
            console.log("Erreur lors de l'envoi du  message",err.message)
        }
    }
}
// export const privateConversation = (data1) => {
//     return {
//         type: "GET_PRIVATE_CONVERSATION",
//        payload:data1
//     }
// }

// export const getPrivateConversation = () => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axios({
//                 method: 'Get',
//                 url: `/api/chat/`,
//             })
//             dispatch(privateConversation(data.result))
//         }
//         catch (err) {
//             console.log("Erreur  pendant l'envoi du  message", err.message)
//         }
//     }

export const getPrivateConversation = () => async dispatch => {
    try {
      dispatch({ type: CHAT_LIST_REQUEST })
      const { data } = await axios.get('/api/chat/')
      dispatch({ type: CHAT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: CHAT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
  
