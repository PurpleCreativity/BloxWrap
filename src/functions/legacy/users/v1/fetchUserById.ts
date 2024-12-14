import type BloxFetch from "../../../../main.js";
import type { LegacyFetchOptions } from "../../../../types/fetchHandler.js";
import type { UserData, rawUserData } from "../../../../types/legacy/Users.js";

export type fetchUserByIdType = (
    this: BloxFetch,

    userId: number,

    fetchOptions?: Partial<LegacyFetchOptions>,
) => Promise<UserData>;

export default async function (
    this: BloxFetch,

    userId: number,

    fetchOptions?: Partial<LegacyFetchOptions>,
): Promise<UserData> {
    const rawdata = await this.fetchHandler.fetchLegacy<rawUserData>("GET", "UsersV1", `/users/${userId}`, {
        params: {},
        body: {},
        useCache: fetchOptions?.useCache ?? true,
    });

    return {
        displayName: rawdata.displayName,
        name: rawdata.name,
        id: rawdata.id,
        hasVerifiedBadge: rawdata.hasVerifiedBadge,
        externalAppDisplayName: rawdata.externalAppDisplayName,
        isBanned: rawdata.isBanned,
        created: new Date(rawdata.created),
        description: rawdata.description,
    };
}
