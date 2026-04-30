import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Save a new version like commit
export const saveVersion = mutation({
  args: {
    docId: v.id("documents"),
    content: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.docId);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember =
      !!(document.organizationId &&
        document.organizationId === organizationId);

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.insert("documentVersions", {
      docId: args.docId,
      content: args.content,
      createdBy: user.subject,
      userName: user.name ?? "Unknown User",   
      userEmail: user.email ?? "", 
      createdAt: Date.now(),
      message: args.message || "Auto save",
    });
  },
});

// Get all versions of a document
export const getVersions = query({
  args: {
    docId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.docId);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember =
      !!(document.organizationId &&
        document.organizationId === organizationId);

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db
      .query("documentVersions")
      .withIndex("by_doc_id", (q) => q.eq("docId", args.docId))
      .order("desc")
      .collect();
  },
});