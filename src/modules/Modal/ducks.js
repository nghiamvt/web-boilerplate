const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

export function openModal(payload) {
  return {
    type: MODAL_OPEN,
    payload,
  };
}

export function closeModal({ id }) {
  return {
    type: MODAL_CLOSE,
    payload: {
      id,
    },
  };
}

const initialState = [];
export default function modalReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MODAL_OPEN:
      return state.concat(payload);
    case MODAL_CLOSE:
      if (payload.id === 0) return [];
      return payload.id
        ? state.filter(m => m.id !== payload.id)
        : state.slice(0, -1);
    default:
      return state;
  }
}
