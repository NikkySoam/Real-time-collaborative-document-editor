import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent:v.optional(v.string()),
    ownerId:v.string(),
    roomId:v.optional(v.string()),
    organizationId:v.optional(v.string())
  })
  .index("by_owner_id",["ownerId"])
  .index("by_organization_id",["organizationId"])
  .searchIndex("search_title",{
    searchField:"title",
    filterFields:["ownerId","organizationId"],
  }),
  //for version control
    documentVersions: defineTable({
    docId: v.id("documents"),
    content: v.string(),
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string()), 
    message: v.optional(v.string()),
  })
    .index("by_doc_id", ["docId"]),

});


