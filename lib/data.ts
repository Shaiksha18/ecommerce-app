interface USER {
  id: number;
  email: string;
  password: string;
  name: string;
}
const UserInfoDetails: USER[] = [];

export const PostUserInfo = (userInfo: USER) => UserInfoDetails.push(userInfo);
// Define the type for user objects
interface UserInfo {
  id: number;
}

// Function to generate a new unique ID
export const generateUniqueId = (): number => {
  const existingIds: number[] = UserInfoDetails.map(
    (user: UserInfo) => user.id,
  );
  const maxId: number = Math.max(...existingIds, 100); // Start from 101 if no existing IDs

  return maxId + 1;
};
export const GetAllUsersInfo = () => UserInfoDetails;

export const GetUserById = (id: number) => {
  const userData = UserInfoDetails.find((item) => item.id === id);
  if (userData) {
    return userData;
  } else {
    throw new Error("No Data Found");
  }
};
