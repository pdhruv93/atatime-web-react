import * as Realm from 'realm-web';

function getRealmApp() {
  return new Realm.App({ id: process.env.REACT_APP_MONGODB_APP_ID });
}

export async function getUser() {
  try {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_MONGODB_AUTH_API_KEY);
    const user = await getRealmApp().logIn(credentials);
    return user;
  } catch (error) {
    console.error(error);
  }
}
