export const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  const BASE_URL = "https://6855264c6a6ef0ed6631731b.mockapi.io";
  if (action.onSuccess === "api/Call") {
    try {
      fetch(`${BASE_URL}/${action.payload.url}`)
        .then((res) => res.json())
        .then((data) => {
          store.dispatch({
            type: action.type,
            payload: data,
          });
        });
    } catch (error) {
      console.log(error);
      store.dispatch({
        type: action.payload.errorType,
        payload: error.message || 'something went to wrong',
      });
    }
  } else {
    next(action);
  }
};
