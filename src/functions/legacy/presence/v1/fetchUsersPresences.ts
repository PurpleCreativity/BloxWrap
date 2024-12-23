import type BloxFetch from "../../../../main.js";
import type { LegacyFetchOptions } from "../../../../types/internal/LegacyFetchHandler.js";
import type { UserPresence } from "../../../../types/legacy/Presence.js";

export type UsersPresenceResponse = {
    userPresences: UserPresence[];
};

export type fetchUsersPresencesType = (
    this: BloxFetch,

    userIds: number | number[],

    fetchOptions?: Partial<LegacyFetchOptions>,
) => Promise<UserPresence[]>;

export default async function (
    this: BloxFetch,

    userIds: number | number[],

    fetchOptions?: Partial<LegacyFetchOptions>,
): Promise<UserPresence[]> {
    const data = (
        await this.LegacyFetchHandler.fetch<UsersPresenceResponse>("POST", "PresenceV1", "/presence/users", {
            body: { userIds: Array.isArray(userIds) ? userIds : [userIds] },
            params: {},
            useCache: fetchOptions?.useCache ?? true,
        })
    ).userPresences;

    for (const entry of data) {
        entry.lastOnline = new Date(entry.lastOnline);
        if (entry.invisibleModeExpiry) entry.invisibleModeExpiry = new Date(entry.invisibleModeExpiry);
    }

    return data;
}
