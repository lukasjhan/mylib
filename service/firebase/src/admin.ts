const config = require("../config.json");
import firebase, { auth, credential, initializeApp } from "firebase-admin";

const init = async () => {
  if (firebase.apps.length === 0) {
    initializeApp({
      credential: credential.cert(config.admin),
    });
  }
};

export const authorizer = async (event: any, context: any) => {
  init();
  const token = event.authorizationToken;
  try {
    const decodedToken = await auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "arn:aws:execute-api:*:*:*/*/*/*",
        },
      ],
    };

    const customContext = {
      decodedToken: JSON.stringify(decodedToken),
      token: token,
    };
    return {
      principalId: uid,
      policyDocument,
      context: customContext,
    };
  } catch (error) {}
  return { context: { token: "unknown" } };
};

const deleteUser = async (uid: string): Promise<void> => {
  init();
  return new Promise((resolve, reject) => {
    auth()
      .deleteUser(uid)
      .then(() => resolve())
      .catch(reject);
  });
};

export const Firebase = {
  init,
  deleteUser,
};
