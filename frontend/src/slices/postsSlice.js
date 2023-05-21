
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  postaData: null,
  loading:false,
  error :null
}

const fetchPosts = createAsyncThunk("/users/fetchPosts", async ( _ , thunkApi) => {
  try {
    const response = await fetch('http://localhost:5050/posts', {
      headers: {
          'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok) {
      return data;
    } 
    throw Error(data.message)
  } catch(error) {
    return thunkApi.rejectWithValue({message:error.message});
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers:(builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action)=>{
        console.log(action.payload)
        state.postaData = action.payload;
        state.loading = false;
    })
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPosts.rejected, (state, action) =>{
        state.postaData = null
        state.error = action.payload
        state.loading = false
    })
  }
})

export {fetchPosts}

export default postsSlice.reducer