import { handleActions } from '@letapp/redux-actions';
import * as actions from './productsActions';

const INITIAL_STATE = {
    latest: {
        items: [],
        isLoading: false,
        isError: false,
        error: null,
        isLoadingMore: false,
        isErrorMore: false,
        errorMore: null,
        hasNoMore: false,
    },
    product: {        
        isLoading: false,
        isError: false,
        error: null,
    },
    usersProducts: {
        users: {},
        isLoading: false,
        isError: false,
        error: null,
    },
    add: {
        isLoading: false,
        isError: false,
        error: null,
    },
    images: {
        items: [],
        isLoading: false,
        isError: false,
        error: null,
    },
}

export default handleActions({
    //latest
    [actions.fetchLatest.start]: (state) => ({
        ...state,
        latest: {
            ...state.latest,
            isLoading: true,
            error: null,
            isError: false,
            hasNoMore: false,
        }              
    }),
    [actions.fetchLatest.success]: (state, actions) => ({
        ...state,
        latest: {
            ...state.latest,
            items: actions.payload.result,
            isLoading: false,
        },               
    }),
    [actions.fetchLatest.error]: (state, actions) => ({
        ...state,
        latest: {
            ...state.latest,
            isLoading: false,
            error: actions.payload,
            isError: true,
        }        
    }),
    //latest more
    [actions.fetchLatestMore.start]: (state) => ({
        ...state,
        latest: {
            ...state.latest,
            isLoadingMore: true,
            errorMore: null,
            isErrorMore: false,
        }              
    }),
    [actions.fetchLatestMore.success]: (state, actions) => ({
        ...state,
        latest: {
            ...state.latest,
            items: state.latest.items.concat(actions.payload.result),
            isLoadingMore: false,
        },               
    }),
    [actions.fetchLatestMore.error]: (state, actions) => ({
        ...state,
        latest: {
            ...state.latest,
            isLoadingMore: false,
            errorMore: actions.payload,
            isErrorMore: true,
        }        
    }),
    // latest has no more
    [actions.latestHasNoMore]: (state) => ({
        ...state,
        latest: {
            ...state.latest,
            hasNoMore: true,
        },        
    }),
    //add product
    [actions.addProduct.start]: (state) => ({
        ...state,
        add: {            
            ...state.add,
            isLoading: true,
            error: null,
            isError: false,
        }              
    }),
    [actions.addProduct.success]: (state, actions) => ({
        ...state,
        add: {
            ...state.add,            
            isLoading: false,
        },   
        latest: {
            ...state.latest,
            items: [actions.payload.result, ...state.latest.items],
        },
        images: {
            ...state.images,
            items: [],
            isLoading: false,
        },            
    }),
    [actions.addProduct.error]: (state, actions) => ({
        ...state,
        add: {
            ...state.add,
            isLoading: false,
            error: actions.payload,
            isError: true,
        }        
    }),
    //add image
    [actions.addImage.start]: (state) => ({
        ...state,
        images: {
            ...state.images,
            isLoading: true,
            error: null,
            isError: false,
        }              
    }),
    [actions.addImage.success]: (state, actions) => ({
        ...state,
        images: {
            ...state.images,
            items: [...state.images.items, actions.payload],
            isLoading: false,
        },               
    }),
    [actions.addImage.error]: (state, actions) => ({
        ...state,
        images: {
            ...state.images,
            isLoading: false,
            error: actions.payload,
            isError: true,
        }        
    }),
    // product
    [actions.fetchProduct.start]: (state) => ({
        ...state,
        product: {
            ...state.product,
            isLoading: true,
            error: null,
            isError: false,
        }              
    }),
    [actions.fetchProduct.success]: (state) => ({
        ...state,
        product: {
            ...state.product,            
            isLoading: false,
        },               
    }),
    [actions.fetchProduct.error]: (state, actions) => ({
        ...state,
        product: {
            ...state.product,
            isLoading: false,
            error: actions.payload,
            isError: true,
        }        
    }),
    // user products
    [actions.fetchUserProducts.start]: (state) => ({
        ...state,
        usersProducts: {
            ...state.usersProducts,
            isLoading: true,
            error: null,
            isError: false,
        }              
    }),
    [actions.fetchUserProducts.success]: (state, actions) => ({
        ...state,
        usersProducts: {
            ...state.usersProducts,
            users: {...state.usersProducts.users, [actions.payload.id]: actions.payload.result},
            isLoading: false,
        },               
    }),
    [actions.fetchUserProducts.error]: (state, actions) => ({
        ...state,
        usersProducts: {
            ...state.usersProducts,
            isLoading: false,
            error: actions.payload,
            isError: true,
        }        
    }),
}, INITIAL_STATE);