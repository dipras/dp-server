import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import db from "./db";
import { commentTable } from "./db/schema";
import { desc, eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-typebox";
import {cors} from "@elysiajs/cors"

const _comment = createSelectSchema(commentTable);
const app = new Elysia()
            .use(cors({
              origin: "*"
            }))
            .use(swagger())
            .get("/", () => "Hello Elysia")
            .group("/comment", app => 
              app
                .post("/", async ({body}) => {
                const {name, comment} = body;
                const result = await db.insert(commentTable).values({name, comment}).execute();
                const lastDataArr = await db.select().from(commentTable).where(eq(commentTable.id, result[0].insertId));
                const lastData = lastDataArr[0];

                return {
                  status: 200,
                  message: "Success",
                  data: lastData
                }
              }, {
                body: t.Object({
                  name: t.String({minLength: 1}),
                  comment: t.String({minLength: 8})
                }),
                response: t.Object({
                  status: t.Integer(),
                  message: t.String(),
                  data: _comment
                })
              })
              .get("/", async () => {
                const data = await db.select().from(commentTable).orderBy(desc(commentTable.created_at));
                return {
                  status: 200,
                  message: "Sucess get comments",
                  data
                }
              }, {
                response: t.Object({
                  status: t.Integer(),
                  message: t.String(),
                  data: t.Array(_comment)
                })
              })
            )
            .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
