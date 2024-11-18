import {
  type Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "@auth/core/adapters";

export default function RESTAdapter(client: any): Adapter {
  return {
    async createUser(profile: AdapterUser) {
      console.log("Creating user");
      console.log(profile);
      const response = await client.post("/api/users", profile);
      return response.data;
    },

    async getUser(id: string | number) {
      console.log("Getting user");
      console.log(id);
      const response = await client.get(`/api/users/${id}`);
      return response.data;
    },

    async getUserByEmail(email: string) {
      console.log("Getting user by email");
      console.log(email);
      const response = await client.get("/api/users", { params: { email } });
      return response.data.length > 0 ? response.data[0] : null;
    },

    async updateUser(user: AdapterUser) {
      console.log("Updating user");
      console.log(user);
      const response = await client.put(`/api/users/${user.id}`, user);
      return response.data;
    },

    async deleteUser(userId: string | number) {
      console.log("Deleting user");
      console.log(userId);
      await client.delete(`/users/${userId}`);
      return null;
    },

    async getUserByAccount({ providerAccountId, provider }: AdapterAccount) {
      console.log("Getting user by account");
      console.log(providerAccountId);
      console.log(provider);
      const params = {
        provider,
        provider_account_id: providerAccountId,
      };
      const response = await client.get("/api/accounts/", { params });
      if (response.data.length > 0) {
        return response.data[0];
      }

      return null;
    },

    async createSession({ sessionToken, userId, expires }: AdapterSession) {
      console.log("Creating session");
      console.log(sessionToken);
      console.log(userId);
      console.log(expires);
      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken: string) {
      console.log("Getting session and user");
      console.log(sessionToken);
      return null;
    },

    async linkAccount(account: AdapterAccount) {
      console.log("Linking account");
      console.log(account);
      const response = await client.post("/api/accounts/", account);
      return response.data;
    },

    async unlinkAccount({ providerAccountId, provider }: AdapterAccount) {
      console.log("Unlinking account");
      console.log(providerAccountId);
      console.log(provider);
      return;
    },

    async updateSession(session: AdapterSession) {
      console.log("logging session");
      console.log(session);
      return null;
    },
    async deleteSession(sessionToken: string) {
      return;
    },
  };
}
