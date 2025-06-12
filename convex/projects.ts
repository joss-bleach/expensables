import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createProject = mutation({
  args: {
    name: v.string(),
    userClerkId: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    perDiemAmount: v.number(),
    restDays: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("projects", {
      name: args.name,
      userClerkId: identity.subject,
      startDate: args.startDate,
      endDate: args.endDate,
      perDiemAmount: args.perDiemAmount,
      restDays: args.restDays,
    });
  },
});

export const getProjects = query({
  args: {
    userClerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user_clerk_id", (q) =>
        q.eq("userClerkId", args.userClerkId),
      );
  },
});
