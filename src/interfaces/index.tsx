export interface AppUserInterface {
  userId: string;
  name: string;
  email: string;
  profilePic: string;
  location?: {
    locationName: string;
    locationCoords: { lat: number; lng: number };
  };
  soMeDetails?: {
    fbUsername?: string;
    igHandle?: string;
    waNumber?: string;
  };
  loginCount?: number;
  lastActivityTime?: Date;
}

export interface DBResponseInterface extends AppUserInterface {
  _id: string;
}

export interface SimilarUsersInterface extends UserActivitiesInterface {
  userDetails: DBResponseInterface;
}

export interface GoogleCredentialsInterface {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export interface UserActivitiesInterface {
  _id: string;
  userId: string;
  activityId: string;
  time: Date;
}

export interface ActivitiesInterface {
  _id: string;
  name: string;
  icon: string;
}

export interface PastActivitiesInterface extends UserActivitiesInterface {
  activityDetails: ActivitiesInterface;
}

export interface MapContextInterface {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  markers: google.maps.Marker[] | [];
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.Marker[] | []>>;
}

export interface UserContextInterface {
  realmUser: Realm.User | null;
  appUser: AppUserInterface | null;
  setAppUser: React.Dispatch<React.SetStateAction<AppUserInterface | null>>;
}

export interface SimilarUsersPropsInterface {
  activityId: string;
  activityName: string;
}
