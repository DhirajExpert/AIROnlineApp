import { takeLatest, put, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';

function* handleLogin() {
  try {
    // Simulate API call
    yield delay(1000);
    const user = { id: 1, name: 'User User', email: 'user@example.com' };
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure('Login failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
