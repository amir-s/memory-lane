# A few things:

- To create the DB, run `npm run prepare-db`. This will create a `memories.db` file in the root of the project.
- I used NextJS (the app router) and [DaisyUI](https://daisyui.com/) which is a UI library on top of tailwind.
- I opted out in implementing a multi-user feature with no "login" intrinsically. Users can create a memory and in that memory can add multiple entries. A user session that creates a memory, also gets a cookie that identifies them as admin of that memory.
- Admin sessions can be recovered through a link that can be copied and saved separately by the admin. That is done through `src/app/memories/[id]/auth/route.ts`, which creates the cookie and redirects the user back to the memory page.
- I extracted the db logic into `src/db/index.ts`. Ideally I would integrate something like [Prisma](https://www.prisma.io/) or [Drizzle](https://orm.drizzle.team/). But the use-case was simple enough to just use raw sql statements.
- I did not expose rest or graphql APIs since I didn't think that's the focus. I mainly used server actions in conjunction with react server components. For client side interactions there are a couple client components that deal with user interaction, but the rest are server-side rendered. So no client-side data fetching was required.

# Known Issues:

- Admin links can be lost! We can integrate an email field when creating a memory so admin sessions can be recovered.
- Deleting/Editing is not implemented to keep things simple.
- No tests! To keep it simple and straightforward I didn't add any tests but in real production apps I would add tests and setup a CI pipeline to run the tests and the linter.
- Not ready to be deployed. For deployment, the db address needs to be extracted to something like an env var so it can be configured. The images are currently stored in the db which is not ideal. Ideally those can be saved into a s3 bucket and served through a CDN.
- Memory IDs are enumerable. This can be fixed by encrypting the ID via a secret and have the encrypted ID as part of the URL or generate a random string (similar to the secret cookie in the current implementation) and use that as a reference to the memory.
- Not a lot of error checking and validation to keep things simple. Otherwise strict validation can be implemented via something like [Zod](https://zod.dev/).
- Drag and drop images doesn't work on mobile because drag and drop is not supported on mobile. A file input can be used instead.
