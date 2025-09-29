import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "../components";

const MyProfile = () => {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  console.log("user from getIdentity:", user);

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?._id,   // 👈 use id instead of userid
    queryOptions: {
      enabled: !!user?._id, // 👈 only fetch when id exists
    },
  });

  const myProfile = data?.data ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties ?? []}
    />
  );
};

export default MyProfile;
