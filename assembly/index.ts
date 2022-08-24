import { usersProfiles, Profile } from "./Profile"; 

  export function createProfile(
    Name: string,
    Bio: string,
    Email : string,
    Website : string,
    ImageURL : string,
    DateofBirth : string,
    NEARaccountID : string
  ): string {
    const profile = new Profile(Name, Bio, Email, Website, ImageURL, DateofBirth);
    for (let i = 0; i < usersProfiles.length; i++) {
        let profile = usersProfiles[i];
        if (profile.NEARaccountID == NEARaccountID) {
            usersProfiles.push(Profile);
            return "Profile of " + Name + " has been created successfully !!";
        }
      }
  }

  export function getProfile(NEARaccountID: string): Profile {
    for (let i = 0; i < usersProfiles.length; i++) {
      let profile = usersProfiles[i];
      if (profile.NEARaccountID == NEARaccountID) {
        return profile;
      }
    }
    return new Profile ("", "", "", "", "", "");
  }


