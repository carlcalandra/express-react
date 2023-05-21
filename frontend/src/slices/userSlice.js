
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedIn")) || null,
  loading:false,
  error :null
}

const fetchUser = createAsyncThunk("/users/fetchUserById", async (formData, thunkApi) => {
  try {
    const response = await fetch('http://localhost:5050/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('loggedIn', JSON.stringify(data))
      return data;
    } 
    throw Error(data.message)
  } catch(error) {
    return thunkApi.rejectWithValue({message:error.message});
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers:(builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action)=>{
      state.user = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUser.rejected, (state, action) =>{
      console.log(action.payload)
      state.user = null
      state.loading = false
      state.error = action.payload
    })
  }
})

export {fetchUser}

export default userSlice.reducer