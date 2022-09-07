import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        books: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addBook: (state, action) => {
            const bookId = state.books.findIndex(i => i._id === action.payload._id);
            if (bookId === -1) {
                state.books.push(action.payload);
            } else {
                state.books[bookId].quantity += action.payload.quantity;
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
        },
        updateBook: (state, action) => {
            const bookId = state.books.findIndex(i => i._id === action.payload.id);
            if (bookId !== -1) {
                if (action.payload.type === 'inc') {
                    state.books[bookId].quantity += 1
                    state.quantity += 1;
                    state.total += state.books[bookId].price;
                }
                else {
                    if (state.books[bookId].quantity > 0){
                        state.books[bookId].quantity -= 1;
                        state.quantity -= 1;
                        state.total -= state.books[bookId].price;
                    }
                    
                }
            }
        },
        deleteBook: (state, action) => {
            const bookId = state.books.findIndex(i => i._id === action.payload.id);
            if (bookId !== -1) {
                state.quantity -= state.books[bookId].quantity;
                state.total -= state.books[bookId].price * state.books[bookId].quantity;
                state.books.splice(bookId,1);

            }
        },
        emptyCart: (state) => {
            state.quantity = 0;
            state.books = [];
            state.total = 0;
        },
    }
})

export const { addBook, deleteBook,updateBook, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;