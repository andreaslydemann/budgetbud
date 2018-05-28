import firebase from 'firebase';

export const setupFirebaseMock = () => {
    const testToken = "TESTTOKEN";
    const getIdToken = jest.fn(() => {
        return Promise.resolve(testToken)
    });
    const testUserID = "TEST_USER";

    const signInWithCustomToken = jest.fn();
    firebase.auth = jest.fn();
    jest.spyOn(firebase, 'auth').mockImplementation(() => {
        return {
            signInWithCustomToken,
            currentUser: {getIdToken, uid: testUserID}
        }
    });
};