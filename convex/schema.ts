import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    userClerkId: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    perDiemAmount: v.number(),
    restDays: v.number(),
  }).index("by_user_clerk_id", ["userClerkId"]),
});
