import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { organization } from "./auth-schema";

export * from "./auth-schema";

export const ingredient = pgTable(
  "ingredient",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    organizationId: text()
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text().notNull(),
    description: text(),
    inStock: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("ingredient_organization_id_idx").on(t.organizationId),
    unique("ingredient_id_org_uniq").on(t.id, t.organizationId),
  ],
);

export const ingredientAlternate = pgTable(
  "ingredient_alternate",
  {
    ingredientId: text()
      .notNull()
      .references(() => ingredient.id, { onDelete: "cascade" }),
    alternateId: text()
      .notNull()
      .references(() => ingredient.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.ingredientId, t.alternateId] })],
);

export const cocktail = pgTable(
  "cocktail",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    organizationId: text()
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text().notNull(),
    url: text(),
    imageUrl: text(),
    description: text(),
    instructions: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().notNull().$onUpdate(() => new Date()),
  },
  (t) => [
    index("cocktail_organization_id_idx").on(t.organizationId),
    unique("cocktail_id_org_uniq").on(t.id, t.organizationId),
  ],
);

export const cocktailIngredient = pgTable(
  "cocktail_ingredient",
  {
    cocktailId: text().notNull(),
    ingredientId: text().notNull(),
    organizationId: text().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.cocktailId, t.ingredientId] }),
    foreignKey({
      columns: [t.cocktailId, t.organizationId],
      foreignColumns: [cocktail.id, cocktail.organizationId],
    }).onDelete("cascade"),
    foreignKey({
      columns: [t.ingredientId, t.organizationId],
      foreignColumns: [ingredient.id, ingredient.organizationId],
    }).onDelete("cascade"),
  ],
);

export const ingredientRelations = relations(ingredient, ({ one, many }) => ({
  organization: one(organization, {
    fields: [ingredient.organizationId],
    references: [organization.id],
  }),
  alternates: many(ingredientAlternate, { relationName: "ingredient_alternates" }),
  alternateOf: many(ingredientAlternate, { relationName: "ingredient_alternate_of" }),
  cocktails: many(cocktailIngredient),
}));

export const ingredientAlternateRelations = relations(ingredientAlternate, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [ingredientAlternate.ingredientId],
    references: [ingredient.id],
    relationName: "ingredient_alternates",
  }),
  alternate: one(ingredient, {
    fields: [ingredientAlternate.alternateId],
    references: [ingredient.id],
    relationName: "ingredient_alternate_of",
  }),
}));

export const tag = pgTable(
  "tag",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    organizationId: text()
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().notNull().$onUpdate(() => new Date()),
  },
  (t) => [
    index("tag_organization_id_idx").on(t.organizationId),
    unique("tag_id_org_uniq").on(t.id, t.organizationId),
  ],
);

export const cocktailTag = pgTable(
  "cocktail_tag",
  {
    cocktailId: text().notNull(),
    tagId: text().notNull(),
    organizationId: text().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.cocktailId, t.tagId] }),
    foreignKey({
      columns: [t.cocktailId, t.organizationId],
      foreignColumns: [cocktail.id, cocktail.organizationId],
    }).onDelete("cascade"),
    foreignKey({
      columns: [t.tagId, t.organizationId],
      foreignColumns: [tag.id, tag.organizationId],
    }).onDelete("cascade"),
  ],
);

export const cocktailRelations = relations(cocktail, ({ one, many }) => ({
  organization: one(organization, {
    fields: [cocktail.organizationId],
    references: [organization.id],
  }),
  ingredients: many(cocktailIngredient),
  tags: many(cocktailTag),
}));

export const tagRelations = relations(tag, ({ one, many }) => ({
  organization: one(organization, {
    fields: [tag.organizationId],
    references: [organization.id],
  }),
  cocktails: many(cocktailTag),
}));

export const cocktailTagRelations = relations(cocktailTag, ({ one }) => ({
  cocktail: one(cocktail, {
    fields: [cocktailTag.cocktailId],
    references: [cocktail.id],
  }),
  tag: one(tag, {
    fields: [cocktailTag.tagId],
    references: [tag.id],
  }),
}));

export const cocktailIngredientRelations = relations(cocktailIngredient, ({ one }) => ({
  cocktail: one(cocktail, {
    fields: [cocktailIngredient.cocktailId],
    references: [cocktail.id],
  }),
  ingredient: one(ingredient, {
    fields: [cocktailIngredient.ingredientId],
    references: [ingredient.id],
  }),
}));
