export interface CoachProfile {
    id: string;
    name: string;
    bio: string;
    specialty: string;
    email: string;
    gender: string;
}
export interface Coach {
    id: string;
    profile: CoachProfile;
}
export interface CoachLogin {
    id: string;
    email: string;
    password: string;
}